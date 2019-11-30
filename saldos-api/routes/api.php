<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'cors'], function () {

    Route::post('_Log_In', 'Auth\LoginController@Login');

    Route::get('_Cat_Roles', 'CatalogosController@roles');
    Route::get('_Cat_Estados', 'CatalogosController@estados');
    Route::post('_Cat_Municipios', 'CatalogosController@municipios');
    Route::get('_Cat_Meses', 'CatalogosController@meses');


    Route::post('_Usuario_Datos', 'UsuariosController@all');
    Route::post('_Usuario_Agregar', 'UsuariosController@add');
    Route::post('_Usuario_Xid', 'UsuariosController@show');
    Route::post('_Usuario_Editar', 'UsuariosController@edit');
    Route::post('_Usuario_Eliminar', 'UsuariosController@delete');


    Route::post('_Usuarios_Cargos_Datos', 'CargarMensualidadController@all');
    Route::post('_Usuarios_Cargos_Agregar', 'CargarMensualidadController@addcargos');
    Route::post('_Usuario_Cargo_Agregar', 'CargarMensualidadController@addcargo');
    Route::post('_Usuario_Cargo_xId', 'CargarMensualidadController@cargosid');

    Route::post('_Usuarios_Pagos_Datos', 'PagosController@all');
    Route::post('_Usuario_Saldo_Pagar', 'PagosController@addpago');




});
