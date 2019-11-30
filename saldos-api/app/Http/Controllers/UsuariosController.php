<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UsuariosController extends Controller
{
    public function all()
    {
        $data = $this->DataRequest();

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
                        ->select('usuarios.*', 'rol_usuarios.rol','usuario_perfil.*','cat_estados.estado', 'cat_municipios.municipio')
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

    public function show()
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

                    $id_usuario = $data['data']['id_usuario'];

                    $row = DB::table('usuario')
                        ->select('usuario.*')
                        ->where('usuario.id_usuario', '=', $id_usuario)
                        ->first();

                    if ($row->foto) {
                        $row->foto_archivo = $row->foto;
                        $formato = explode('.', $row->foto_archivo);
                        if (count($formato) === 2) {
                            $row->foto_formato = $formato[1];
                        } else {
                            $row->foto_formato = '';
                        }
                    } else {
                        $row->foto_archivo = '';
                        $row->foto_formato = '';
                    }

                    if ($row) {
                        $flag = true;
                        $status = 200;
                        $message = "Datos encontrados.";
                        $data = $row;
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

    public function add()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'id_usuario' => '',
                'id_rol' => 'required',
                'nombre_completo' => 'required',
                'sexo' => 'required',
                'telefono' => 'required',
                'email' => 'required',
                'id_cat_estado' => 'required',
                'direccion' => 'required',
                'usuario' => 'required',
                'password' => 'required',
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {

                    $id_usuario = $data['data']['id_usuario'] ?? null;
                    $id_rol = $data['data']['id_rol'] ?? null;
                    $nombre_completo = $data['data']['nombre_completo'] ?? null;
                    $sexo = $data['data']['sexo'] ?? null;
                    $telefono = $data['data']['telefono'] ?? null;
                    $email = $data['data']['email'] ?? null;
                    $id_cat_municipio = $data['data']["id_cat_municipio"] ?? null;
                    $direccion = $data['data']["direccion"] ?? null;
                    $usuario = $data['data']["usuario"] ?? null;
                    $password = $data['data']["password"] ?? null;



                    $insertId = DB::table('usuario_perfil')->insertGetId([
                        "nombre_completo" => $nombre_completo,
                        "sexo" => $sexo,
                        "rfc" => null,
                        "telefono" => $telefono,
                        "email" => $email,
                        "id_cat_municipio" => $id_cat_municipio,
                        "direccion" => $direccion
                    ]);


                    if ($insertId) {

                        $insertIdUsuario = DB::table('usuarios')->insertGetId([
                            "username" => $usuario,
                            "password" => $password,
                            "id_usuario_perfil" => $insertId,
                            "id_rol" => $id_rol,
                        ]);
                        if ($insertIdUsuario) {
                            DB::commit();
                            $flag = true;
                            $status = 200;
                            $message = "Datos agregados.";
                            $data = $insertId;
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

    public function edit()
    {
        $data = $this->DataRequest();

        if ($this->AccessToken($data['token'], $data['credenciales'], $Usr, $errors)) {

            $validator = Validator::make($data['data'], [
                'id_usuario' => 'required',
                'id_cat_sexo' => 'required',
                'username' => 'required',
                'password' => 'required',
                'nombre' => 'required',
                'apellido_paterno' => 'required',
                'apellido_materno' => 'required',
                'foto_archivo' => 'required',
                'foto_formato' => 'required',
            ]);

            $flag = false;

            if (!$validator->fails()) {

                DB::beginTransaction();

                try {

                    $id_usuario = $data['data']['id_usuario'] ?? null;
                    $id_cat_sexo = $data['data']['id_cat_sexo'] ?? null;
                    $username = $data['data']['username'] ?? null;
                    $password = $data['data']['password'] ?? null;
                    $nombre = $data['data']['nombre'] ?? null;
                    $apellido_paterno = $data['data']['apellido_paterno'] ?? null;
                    $apellido_materno = $data['data']['apellido_materno'] ?? null;

                    $foto_archivo = $data['data']["foto_archivo"] ?? null;
                    $foto_formato = $data['data']["foto_formato"] ?? null;

                    $row = DB::table('usuario')
                        ->select('usuario.*')
                        ->where('usuario.id_usuario', '=', $id_usuario)
                        ->first();

                    if ($foto_archivo && $foto_formato) {
                        $nombre_archivo = 'foto-' . md5($id_usuario);
                        $archivo = $this->Base64ToFile(
                            $foto_archivo,
                            'files/',
                            $nombre_archivo,
                            $foto_formato
                        );
                        if ($archivo['success'] === true) {
                            $ruta = $archivo['ruta'];
                        } else {
                            $ruta = $row->foto;
                        }
                    } else {
                        $ruta = $row->foto;
                    }

                    $update = DB::table('usuario')
                        ->where('usuario.id_usuario', '=', $id_usuario)
                        ->update([
                            "id_cat_sexo" => $id_cat_sexo,
                            "username" => $username,
                            "password" => $password,
                            "nombre" => $nombre,
                            "apellido_paterno" => $apellido_paterno,
                            "apellido_materno" => $apellido_materno,
                            "foto" => $ruta,
                            "token" => $row->token,
                            "expiracion" => $row->expiracion,
                        ]);

                    if ($update) {
                        $flag = true;
                        $status = 200;
                        $message = "Datos actualizados.";
                        $data = array();
                        DB::commit();
                    } else {
                        $flag = false;
                        $status = 400;
                        $message = "Error al actualizar.";
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
