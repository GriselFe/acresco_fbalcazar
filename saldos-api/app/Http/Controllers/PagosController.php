<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PagosController extends Controller
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
            $id_usuario = $data['credenciales']['id_usuario'];
            if (!$validator->fails()) {

                DB::beginTransaction();

                try {
                    $result = DB::table('usuarios')
                        ->select('usuarios.*','cargo_usuarios.*','cat_meses.mes','abono_usuarios.fecha_pago','abono_usuarios.comprobante')
                        ->join('cargo_usuarios', 'cargo_usuarios.id_usuario','=', 'usuarios.id_usuario')
                        ->join('cat_meses', 'cat_meses.id_cat_mes','=', 'cargo_usuarios.id_cat_mes')
                        ->leftjoin('abono_usuarios',  'cargo_usuarios.id_cargo_usuarios','=','abono_usuarios.id_cargo_usuarios')
//                        ->orWhereNull('abono_usuarios.id_cargo_usuarios')
                        ->Where('cargo_usuarios.id_usuario','=',$id_usuario)
                        ->get();
                    $meses = DB::table('cat_meses')
                        ->select('cat_meses.mes','cat_meses.id_cat_mes')
                        ->get();

                    if (count($meses) > 0) {
                        $saldo_total = 0;
                        foreach ($meses as $mes) {
                            $mes->importe = 0;
                            foreach ($result as $item) {
                                if($mes->id_cat_mes == $item->id_cat_mes){
                                    $mes->importe = $item->importe;
                                    $mes->id_cargo_usuarios = $item->id_cargo_usuarios;
                                    $mes->fecha_pago = $item->fecha_pago;
                                    $mes->comprobante = $item->comprobante;
                                    $mes->fecha_alta = $item->fecha_alta;
                                    $mes->anio = $item->anio ?? $this->anio;
                                    $saldo_total += $mes->importe;
//                                    dd($importe_total);
                                }

                            }
                        }
                        $flag = true;
                        $status = 200;
                        $message = "Datos encontrados.";
                        $data = $meses;
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
                        "saldo_total" => $saldo_total,
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




    public function addpago()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'fecha_pago' => 'required',
                'comprobante' => ''
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {
                    $insertIdUsuario = false;

                    $id_cargo_usuario = $data['data']["id_cargo_usuario"] ?? null;
                    $comprobante = $data['data']["comprobante"] ?? null;
                    $fecha_pago = $data['data']['fecha_pago'] ?? null;

                    $insertIdUsuario = DB::table('abono_usuarios')->insertGetId([
                        "id_cargo_usuarios" => $id_cargo_usuario,
                        "comprobante" => $comprobante,
                        "fecha_pago" => $fecha_pago
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
