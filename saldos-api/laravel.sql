-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2019 a las 19:38:45
-- Versión del servidor: 5.7.27
-- Versión de PHP: 7.3.9
USE laravel;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laravel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_sexo`
--

CREATE TABLE `cat_sexo` (
  `id_cat_sexo` int(11) NOT NULL,
  `sexo` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `activo` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cat_sexo`
--

INSERT INTO `cat_sexo` (`id_cat_sexo`, `sexo`, `activo`) VALUES
(1, 'Hombre', 0),
(2, 'Mujer', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_cat_sexo` int(11) DEFAULT NULL,
  `username` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `apellido_paterno` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `apellido_materno` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `foto` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `token` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `expiracion` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_cat_sexo`, `username`, `password`, `nombre`, `apellido_paterno`, `apellido_materno`, `foto`, `token`, `expiracion`) VALUES
(1, 2, 'admin', 'admin', 'Nombre(s)', 'Paterno', 'Materno', 'files/foto-c4ca4238a0b923820dcc509a6f75849b1573760192.png', '9ea4f1ee7f7c34de1ab12116997b8207', '2019-11-14 20:06:22'),
(4, 1, '1', '1', '1', '1', '1', 'files/foto-a87ff679a2f3e71d9181a67b7542122c1573756369.png', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cat_sexo`
--
ALTER TABLE `cat_sexo`
  ADD PRIMARY KEY (`id_cat_sexo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_sexo` (`id_cat_sexo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cat_sexo`
--
ALTER TABLE `cat_sexo`
  MODIFY `id_cat_sexo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_cat_sexo`) REFERENCES `cat_sexo` (`id_cat_sexo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
