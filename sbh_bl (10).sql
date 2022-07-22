-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2022 at 08:28 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sbh_bl`
--

-- --------------------------------------------------------

--
-- Table structure for table `bl_b5`
--

CREATE TABLE `bl_b5` (
  `id_bl` text DEFAULT NULL,
  `id` text DEFAULT NULL,
  `tgl` text DEFAULT NULL,
  `no` text DEFAULT NULL,
  `kd_kualitas` text DEFAULT NULL,
  `jml` text DEFAULT NULL,
  `harga` text DEFAULT NULL,
  `nilai` text DEFAULT NULL,
  `cara` text DEFAULT NULL,
  `jenis` text DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `kd_entri` text DEFAULT NULL,
  `nama_kualitas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bl_b41`
--

CREATE TABLE `bl_b41` (
  `id_bl` text DEFAULT NULL,
  `id` text DEFAULT NULL,
  `no_urut` text DEFAULT NULL,
  `nama` text DEFAULT NULL,
  `hubungan` text DEFAULT NULL,
  `jenkel` text DEFAULT NULL,
  `umur` text DEFAULT NULL,
  `pendidikan` text DEFAULT NULL,
  `masih_sekolah` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bl_dok`
--

CREATE TABLE `bl_dok` (
  `id_bl` varchar(13) DEFAULT NULL,
  `id_bs` varchar(9) DEFAULT NULL,
  `id_dsrt` varchar(7) DEFAULT NULL,
  `triwulan` varchar(8) DEFAULT NULL,
  `bulan` varchar(5) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nbs` varchar(4) DEFAULT NULL,
  `nks` varchar(5) DEFAULT NULL,
  `no_ruta` varchar(7) DEFAULT NULL,
  `nama_krt` text DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `no_tlpn` text DEFAULT NULL,
  `no_hp` text DEFAULT NULL,
  `b221` text DEFAULT NULL,
  `b222` text DEFAULT NULL,
  `b241_tgl` text DEFAULT NULL,
  `b241_bln` text DEFAULT NULL,
  `b242_tgl` text DEFAULT NULL,
  `b242_bln` text DEFAULT NULL,
  `b3_catatan` text DEFAULT NULL,
  `b43` text DEFAULT NULL,
  `b43_asisten` text DEFAULT NULL,
  `b43_babysitter` text DEFAULT NULL,
  `b43_sopir` text DEFAULT NULL,
  `b43_satpam` text DEFAULT NULL,
  `b43_lainnya` text DEFAULT NULL,
  `flag_error` text DEFAULT NULL,
  `creator` text DEFAULT NULL,
  `modifier` text DEFAULT NULL,
  `createdate` text DEFAULT NULL,
  `modifydate` text DEFAULT NULL,
  `kol1` text DEFAULT NULL,
  `kol2` text DEFAULT NULL,
  `kol3` text DEFAULT NULL,
  `kol4` text DEFAULT NULL,
  `kol5` text DEFAULT NULL,
  `kol6` text DEFAULT NULL,
  `kol7` text DEFAULT NULL,
  `kol8` text DEFAULT NULL,
  `kol9` text DEFAULT NULL,
  `kol10` text DEFAULT NULL,
  `kol11` text DEFAULT NULL,
  `kol12` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bs`
--

CREATE TABLE `bs` (
  `id_bs` varchar(9) DEFAULT NULL,
  `tw` varchar(2) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nbs` varchar(4) DEFAULT NULL,
  `nks` varchar(5) DEFAULT NULL,
  `kd_sls` varchar(6) DEFAULT NULL,
  `nama_sls` text DEFAULT NULL,
  `waktu_tarik_sample` text DEFAULT NULL,
  `nama_prov` text DEFAULT NULL,
  `nama_kab` text DEFAULT NULL,
  `nama_kec` text DEFAULT NULL,
  `nama_desa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dsrt`
--

CREATE TABLE `dsrt` (
  `id_bs` varchar(9) DEFAULT NULL,
  `id_dsrt` varchar(7) DEFAULT NULL,
  `no_sample` varchar(9) DEFAULT NULL,
  `no_bangunan` varchar(11) DEFAULT NULL,
  `no_ruta` varchar(7) DEFAULT NULL,
  `no_keluarga` varchar(11) DEFAULT NULL,
  `nama_sls` text DEFAULT NULL,
  `nama_kk` text DEFAULT NULL,
  `nama_krt` text DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `gol` text DEFAULT NULL,
  `pendidikan` text DEFAULT NULL,
  `jml_art` text DEFAULT NULL,
  `jenis` text DEFAULT NULL,
  `no_sample_utama` text DEFAULT NULL,
  `no_sample_yang_digantikan` text DEFAULT NULL,
  `hasil_pencacahan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `entribl`
--

CREATE TABLE `entribl` (
  `id_bs` varchar(9) NOT NULL,
  `tw` varchar(2) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nks` varchar(5) NOT NULL,
  `id_dsrt` varchar(7) NOT NULL,
  `no_ruta` varchar(7) DEFAULT NULL,
  `no_bangunan` varchar(11) DEFAULT NULL,
  `no_sample` varchar(9) DEFAULT NULL,
  `nama_krt` text DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `gol` text DEFAULT NULL,
  `pendidikan` text DEFAULT NULL,
  `jml_art` text DEFAULT NULL,
  `jenis` text DEFAULT NULL,
  `no_sample_utama` text DEFAULT NULL,
  `hasil_pencacahan` text DEFAULT NULL,
  `jml_kualitas` text DEFAULT NULL,
  `flag_error` text DEFAULT NULL,
  `lock_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `nks`
--

CREATE TABLE `nks` (
  `id_bs` varchar(9) NOT NULL,
  `nks` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entribl`
--
ALTER TABLE `entribl`
  ADD PRIMARY KEY (`id_bs`,`nks`,`id_dsrt`);

--
-- Indexes for table `nks`
--
ALTER TABLE `nks`
  ADD PRIMARY KEY (`id_bs`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
