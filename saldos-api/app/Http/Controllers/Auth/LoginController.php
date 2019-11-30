<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function Login()
    {
        date_default_timezone_set('America/Mexico_City');

        $data = $this->DataRequest();

        $validator = Validator::make($data['data'], [
            'username' => 'required',
            'password' => 'required'
        ]);

        $flag_request = false;

        if (!$validator->fails()) {

            DB::beginTransaction();

            try {

                $username = $data['data']['username'];
                $password = $data['data']['password'];

                $row = DB::table('usuarios')
                    ->where('usuarios.username', $username)
                    ->where('usuarios.password', $password)
                    ->select('usuarios.*')
                    ->first();

                if ($row) {

                    $row->token = md5($row->id_usuario . date('Y-m-d H:i:s'));
                    $row->expiracion = date('Y-m-d H:i:s', strtotime('+' . $this->TIEMPO_EXPIRACION . ' minutes'));

                    $update = DB::table('usuarios')
                        ->where('usuarios.id_usuario', $row->id_usuario)
                        ->update([
                            'token' => $row->token,
                            'expiracion' => $row->expiracion
                        ]);

                    if ($update > 0) {
                        $flag_request = true;
                        $status = 200;
                        $message = "Datos correctos..";
                        $data = $row;
                        DB::commit();
                    } else {
                        $flag_request = false;
                        $status = 400;
                        $message = "Datos incorrectos.";
                        $data = array();
                        DB::rollback();
                    }

                } else {
                    $flag_request = false;
                    $status = 400;
                    $message = "Datos incorrectos.";
                    $data = array();
                    DB::rollback();
                }

                $response = [
                    "success" => $flag_request,
                    "status" => $status,
                    "message" => $message,
                    "data" => $data
                ];

            } catch (\Exception $e) {
                DB::rollback();
                return $this->ErrorTransaction($e);
            }
        } else {
            $response = [
                "success" => $flag_request,
                "status" => 400,
                "message" => "No se encontraron datos.",
                "errors" => $validator->errors()->messages()
            ];
        }

        return $response;
    }
}
