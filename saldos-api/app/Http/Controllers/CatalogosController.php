<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CatalogosController extends Controller
{
    public function roles()
    {

        DB::beginTransaction();

        try {

            $result = DB::table('rol_usuarios')
                ->select('rol_usuarios.*')
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
                "data" => $data
            ];

        } catch (\Exception $e) {
            DB::rollback();
            return $this->ErrorTransaction($e);
        }
        return $response;
    }
    public function estados()
    {

        DB::beginTransaction();

        try {

            $result = DB::table('cat_estados')
                ->select('cat_estados.*')
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
                "data" => $data
            ];

        } catch (\Exception $e) {
            DB::rollback();
            return $this->ErrorTransaction($e);
        }
        return $response;
    }
    public function municipios()
    {

        DB::beginTransaction();
        $data = $this->DataRequest();

        $validator = Validator::make($data['data'], [
            'id_cat_estado' => 'required',
        ]);

        $flag = false;

        if (!$validator->fails()) {
            try {
                $id_cat_estado = $data['data']['id_cat_estado'];

                $result = DB::table('cat_municipios')
                    ->select('cat_municipios.*')
                    ->where('cat_municipios.id_cat_estado', '=', $id_cat_estado)
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
                    "data" => $data
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
            return $response;
    }

    public function meses()
    {

        DB::beginTransaction();

        try {

            $result = DB::table('cat_meses')
                ->select('cat_meses.*')
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
                "data" => $data
            ];

        } catch (\Exception $e) {
            DB::rollback();
            return $this->ErrorTransaction($e);
        }
        return $response;
    }



}
