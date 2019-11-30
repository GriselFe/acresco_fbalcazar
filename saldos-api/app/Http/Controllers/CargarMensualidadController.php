<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CargarMensualidadController extends Controller
{
    public $estandar = '1';
    public $anio = '2018';

    protected function getUsers($id_mes) {

        DB::beginTransaction();
        try {

            $estandar = 1;
            $result = DB::table('usuarios')
                ->select('usuarios.id_usuario')
                ->join('usuario_perfil', 'usuarios.id_usuario_perfil','=', 'usuario_perfil.id_usuario_perfil')
                ->join('rol_usuarios', 'rol_usuarios.id_rol','=', 'usuarios.id_rol')
                ->join('cat_municipios', 'cat_municipios.id_cat_municipio','=', 'usuario_perfil.id_cat_municipio')
                ->join('cat_estados', 'cat_estados.id_cat_estado','=', 'cat_municipios.id_cat_estado')
                ->leftjoin('cargo_usuarios', 'cargo_usuarios.id_usuario','=', 'usuarios.id_usuario')
                ->where('cargo_usuarios.id_cat_mes','<>',$id_mes)
                ->orWhereNull('cargo_usuarios.id_cat_mes')
                ->Where('rol_usuarios.id_rol','=',$this->estandar)
                ->get();

            if ($result) {
                $data = $result;
                DB::commit();
            } else {
                $data = array();
                DB::rollback();
            }

        } catch (\Exception $e) {
            DB::rollback();
            return $this->ErrorTransaction($e);
        }
        return $data;

    }
    protected function getUser($id_mes, $id_usuario) {

        DB::beginTransaction();
        try {

            $result = DB::table('usuarios')
                ->select('usuarios.id_usuario')
                ->join('rol_usuarios', 'rol_usuarios.id_rol','=', 'usuarios.id_rol')
                ->leftjoin('cargo_usuarios', 'cargo_usuarios.id_usuario','=', 'usuarios.id_usuario')
                ->Where('rol_usuarios.id_rol','=',$this->estandar)
                ->where('cargo_usuarios.id_cat_mes','=',$id_mes)
//                ->orWhereNull('cargo_usuarios.id_cat_mes')
                ->Where('cargo_usuarios.id_usuario','=',$id_usuario)
                ->groupBy('usuarios.id_usuario')
                ->get();

            if ($result) {
                $data = $result;
                DB::commit();
            } else {
                $data = array();
                DB::rollback();
            }

        } catch (\Exception $e) {
            DB::rollback();
            return $this->ErrorTransaction($e);
        }
        return $data;

    }
    public function all()
    {
        $data = $this->DataRequest();
        $estandar = 1;
        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'info' => '',
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {

                    $result = DB::table('usuarios')
                        ->join('usuario_perfil', 'usuarios.id_usuario_perfil','=', 'usuario_perfil.id_usuario_perfil')
                        ->join('rol_usuarios', 'rol_usuarios.id_rol','=', 'usuarios.id_rol')
                        ->join('cat_municipios', 'cat_municipios.id_cat_municipio','=', 'usuario_perfil.id_cat_municipio')
                        ->join('cat_estados', 'cat_estados.id_cat_estado','=', 'cat_municipios.id_cat_estado')
                        ->leftjoin('cargo_usuarios', 'cargo_usuarios.id_usuario','=', 'usuarios.id_usuario')
                        ->select('usuarios.*','usuario_perfil.*','cat_estados.estado', 'cat_municipios.municipio', 'cargo_usuarios.*')
                        ->where('rol_usuarios.id_rol','=',$estandar)
                        ->groupBy('usuarios.id_usuario')
                        ->get();


                    if ($result) {
                        $flag = true;
                        $status = 200;
                        $message = "Datos encontrados.";
                        $data = $result;
                        DB::commit();
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "Datos no encontrados.";
                        $data = array();
                        DB::rollback();
                    }

                    $response = [
                        "success" => $flag,
                        "status" => $status,
                        "message" => $message,
                        "data" => $data,
                        "user" => $Usr,
                    ];

                } catch (\Exception $e) {
                    DB::rollback();
                    return $this->ErrorTransaction($e);
                }
            } else {
                $response = [
                    "success" => $flag,
                    "status" => 400,
                    "message" => "No se encontraron datos.",
                    "errors" => $validator->errors()->messages()
                ];
            }

        } else {
            $response = [
                "success" => false,
                "status" => 400,
                "message" => "Token invalido.",
                "errors" => $errors
            ];
        }

        return $response;
    }


    public function addcargos()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'importe' => 'required',
                'id_cat_mes' => 'required',
                'id_usuario' => ''
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {
                    $insertIdUsuario = false;
                    $importe = $data['data']["importe"] ?? null;
                    $id_cat_mes = $data['data']["id_cat_mes"] ?? null;

                    $usuarios = $this->getUsers($id_cat_mes);

                    if (count($usuarios) > 0) {

                        foreach($usuarios as $item){

                            $insertIdUsuario = DB::table('cargo_usuarios')->insertGetId([
                                "importe" => $importe,
                                "id_cat_mes" => $id_cat_mes,
                                "id_usuario" => $item->id_usuario,
                                "anio" => $this->anio
                            ]);
                        }

                        if ($insertIdUsuario) {
                            DB::commit();
                            $flag = true;
                            $status = 200;
                            $message = "Datos agregados.";
                            $data = $insertIdUsuario;
                        }else{
                            $flag = false;
                            $status = 400;
                            $message = "Error al agregar";
                            $data = array();
                            DB::rollback();
                        }
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "Los usuarios ya tienen cargada la mensualidad";
                        $data = array();
                        DB::rollback();
                    }

                    $response = [
                        "success" => $flag,
                        "status" => $status,
                        "message" => $message,
                        "data" => $data,
                        "user" => $Usr,
                    ];

                } catch (\Exception $e) {
                    DB::rollback();
                    return $this->ErrorTransaction($e);
                }
            } else {
                $response = [
                    "success" => $flag,
                    "status" => 400,
                    "message" => "No se encontraron datos.",
                    "errors" => $validator->errors()->messages()
                ];
            }

        } else {
            $response = [
                "success" => false,
                "status" => 400,
                "message" => "Token invalido.",
                "errors" => $errors
            ];
        }

        return $response;
    }

    public function addcargo()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'importe' => 'required',
                'id_cat_mes' => 'required',
                'id_usuario' => ''
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {
                    $insertIdUsuario = false;
                    $users = false;
                    $importe = $data['data']["importe"] ?? null;
                    $id_cat_mes = $data['data']["id_cat_mes"] ?? null;
                    $id_usuario = $data['data']['id_usuario'] ?? null;
                    if($id_usuario){
                        $cargos = $this->getUser($id_cat_mes, $id_usuario);
                    }
                    if (count($cargos) <= 0) {


                        $insertIdUsuario = DB::table('cargo_usuarios')->insertGetId([
                            "importe" => $importe,
                            "id_cat_mes" => $id_cat_mes,
                            "id_usuario" => $id_usuario,
                            "anio" => $this->anio
                        ]);
                        if ($insertIdUsuario) {
                            DB::commit();
                            $flag = true;
                            $status = 200;
                            $message = "Datos agregados.";
                            $data = $insertIdUsuario;
                        }else{
                            $flag = false;
                            $status = 400;
                            $message = "Error al agregar.";
                            $data = array();
                            DB::rollback();
                        }
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "El usuario ya tiene cargada la mensualidad";
                        $data = array();
                        DB::rollback();
                    }

                    $response = [
                        "success" => $flag,
                        "status" => $status,
                        "message" => $message,
                        "data" => $data,
                        "user" => $Usr,
                    ];

                } catch (\Exception $e) {
                    DB::rollback();
                    return $this->ErrorTransaction($e);
                }
            } else {
                $response = [
                    "success" => $flag,
                    "status" => 400,
                    "message" => "No se encontraron datos.",
                    "errors" => $validator->errors()->messages()
                ];
            }

        } else {
            $response = [
                "success" => false,
                "status" => 400,
                "message" => "Token invalido.",
                "errors" => $errors
            ];
        }

        return $response;
    }
    public function cargosid()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'id_usuario' => 'required',
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {

                    $id_usuario = $data['data']['id_usuario'] ?? null;

                    $result = DB::table('usuarios')
                        ->select('usuarios.*','cargo_usuarios.*','cat_meses.mes')
                        ->leftjoin('cargo_usuarios', 'cargo_usuarios.id_usuario','=', 'usuarios.id_usuario')
                        ->leftjoin('cat_meses', 'cat_meses.id_cat_mes','=', 'cargo_usuarios.id_cat_mes')
                        ->Where('cargo_usuarios.id_usuario','=',$id_usuario)
                        ->get();
                    $importe_total = 0;
                    foreach ($result as $item) {
                        $importe_total += $item->importe;
                    }

                    if ($result) {
                        $flag = true;
                        $status = 200;
                        $message = "Datos encontrados.";
                        $data = $result;
                        DB::commit();
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "Datos no encontrados.";
                        $data = array();
                        DB::rollback();
                    }

                    $response = [
                        "success" => $flag,
                        "status" => $status,
                        "message" => $message,
                        "data" => $data,
                        "importe_total" => $importe_total,
                        "user" => $Usr,
                    ];

                } catch (\Exception $e) {
                    DB::rollback();
                    return $this->ErrorTransaction($e);
                }
            } else {
                $response = [
                    "success" => $flag,
                    "status" => 400,
                    "message" => "No se encontraron datos.",
                    "errors" => $validator->errors()->messages()
                ];
            }

        } else {
            $response = [
                "success" => false,
                "status" => 400,
                "message" => "Token invalido.",
                "errors" => $errors
            ];
        }

        return $response;
    }

    public function delete()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'id_usuario' => 'required',
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {

                    $id_usuario = $data['data']['id_usuario'] ?? null;

                    $delete = DB::table('usuario')
                        ->where('usuario.id_usuario', '=', $id_usuario)
                        ->delete();

                    if ($delete) {
                        $flag = true;
                        $status = 200;
                        $message = "Datos eliminados.";
                        $data = array();
                        DB::commit();
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "Error al eliminar.";
                        $data = array();
                        DB::rollback();
                    }

                    $response = [
                        "success" => $flag,
                        "status" => $status,
                        "message" => $message,
                        "data" => $data,
                        "user" => $Usr,
                    ];

                } catch (\Exception $e) {
                    DB::rollback();
                    return $this->ErrorTransaction($e);
                }
            } else {
                $response = [
                    "success" => $flag,
                    "status" => 400,
                    "message" => "No se encontraron datos.",
                    "errors" => $validator->errors()->messages()
                ];
            }

        } else {
            $response = [
                "success" => false,
                "status" => 400,
                "message" => "Token invalido.",
                "errors" => $errors
            ];
        }

        return $response;
    }
}
