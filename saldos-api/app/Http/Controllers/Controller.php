<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $TIEMPO_EXPIRACION = 60;

    public function DataRequest() {

        $json = json_decode(file_get_contents('php://input'), true);

        return $json;
    }

    public function AccessToken($token, $credenciales, &$Usr = null, &$errors = null)
    {

        date_default_timezone_set('America/Mexico_City');

        $validator = Validator::make($credenciales, [
            'id_usuario' => 'required',
            'username' => 'required',
        ]);

        if (!$validator->fails()) {

            $id_usuario = $credenciales['id_usuario'];

            $row = DB::table('usuarios')
                ->select('usuarios.*')
                ->where('usuarios.id_usuario', $id_usuario)
                ->where('usuarios.token', '=', $token)
                ->where('usuarios.expiracion', '>=', date("Y-m-d H:i:s"))
                ->first();

            if ($row) {

                $minutos = (strtotime($row->expiracion) - strtotime(date("Y-m-d H:i:s"))) / 60;

                $minutos = abs($minutos);

                $minutos = floor($minutos);

                if ($minutos <= ($this->TIEMPO_EXPIRACION - 2)) {

                    $row->expiracion = date('Y-m-d H:i:s', strtotime('+' . $this->TIEMPO_EXPIRACION . ' minutes'));

                    DB::table('usuarios')
                        ->where('usuarios.id_usuario', '=', $row->id_usuario)
                        ->update([
                            'expiracion' => $row->expiracion
                        ]);
                }

                $flag_request = true;

                $Usr = $row;

            } else {
                $flag_request = false;
            }

        } else {

            $flag_request = false;

            $errors = $validator->errors()->messages();
        }

        return $flag_request;
    }

    public function ErrorTransaction($e)
    {
        $id_error = null;
        $message_error = $e->getMessage();
        $file_error = $e->getFile();
        $line_error = $e->getLine();
        $code_error = $e->getCode();
        if (isset($e->errorInfo)) {
            $errorInfo = $e->errorInfo;
            $no_error = $errorInfo[1];

            $errorMsg = DB::table('cat_mysql_error')
                ->where('cat_mysql_error.no_error', '=', $no_error)
                ->first();

            if ($errorMsg) {
                $id_error = $errorMsg->id_cat_mysql_error;
                $message = $errorMsg->mensaje ?? $errorMsg->message;
            } else {
                $message = $message_error;
            }
        } else {
            $no_error = 0;
            $message = $message_error;
        }
        $log = array(
            'success' => false,
            'error' => $message,

            'id' => $id_error,
            'number' => $no_error,
            'code' => $code_error,
            'file' => $file_error,
            'line' => $line_error,
            'sqlstate' => $message_error,
            'e' => $e,
        );
        return $log;
    }

    public function Base64ToFile($b64_archivo, $ruta_archivo, $nombre_archivo, $tipo_archivo)
    {

        $base_file = $this->DOC_ROOT_IMAGE();

        $dirname = $base_file . $ruta_archivo;

        if (!is_dir($dirname)) {
            if (!mkdir($dirname, 0777, true) && !is_dir($dirname)) {
                throw new \RuntimeException(sprintf('Directory "%s" was not created', $dirname));
            }
            chmod($dirname, 0777);
        }

        $data = base64_decode($b64_archivo);

        $archivo = $nombre_archivo . $this->DATETIMEUNIX() . '.' . $tipo_archivo;

        $ruta = $ruta_archivo . $archivo;

        $filepath = $base_file . $ruta;

        file_put_contents($ruta, $data);

        if (file_exists($filepath)) {
            $result = array(
                'success' => true,
                'ruta' => $ruta,
                'message' => 'Archivo generado con éxito'
            );
        } else {
            $result = array(
                'success' => false,
                'ruta' => NULL,
                'message' => 'No se genero el archivo'
            );
        }

        return $result;
    }

    public function DOC_ROOT_IMAGE()
    {
        return $_SERVER['DOCUMENT_ROOT'] . $this->GetPath();
    }

    public function GetPath()
    {
        // $URLruta = $_SERVER['REQUEST_URI'];
        // $URLruta = $_SERVER['SCRIPT_NAME'];
        $URLruta = $_SERVER['PHP_SELF'];
        $URLruta = str_replace($this->HTTProtocol() . '://' . $_SERVER['HTTP_HOST'], "", $URLruta);
        $URLruta = str_replace('index.php/', "", $URLruta);
        $URLruta = str_replace('index.php', "", $URLruta);

        return $URLruta;
    }

    public function HTTProtocol()
    {
        return isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] : 'http';
    }

    public function DATETIMEUNIX()
    {
        date_default_timezone_set('America/Mexico_City');
        return strtotime(date('Y-m-d H:i:s'));
    }

}
