-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2022 at 08:29 AM
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
-- Database: `sbh_gabung`
--

-- --------------------------------------------------------

--
-- Table structure for table `bl_b5`
--

CREATE TABLE `bl_b5` (
  `id_bl` varchar(25) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `tgl` int(11) DEFAULT NULL,
  `no` int(11) DEFAULT NULL,
  `kd_kualitas` varchar(25) DEFAULT NULL,
  `jml` decimal(10,3) DEFAULT NULL,
  `harga` bigint(20) DEFAULT NULL,
  `nilai` bigint(20) DEFAULT NULL,
  `cara` text DEFAULT NULL,
  `jenis` text DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `kd_entri` varchar(25) DEFAULT NULL,
  `nama_kualitas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bl_b41`
--

CREATE TABLE `bl_b41` (
  `id_bl` varchar(25) DEFAULT NULL,
  `id` text DEFAULT NULL,
  `no_urut` text DEFAULT NULL,
  `nama` text DEFAULT NULL,
  `hubungan` int(11) DEFAULT NULL,
  `jenkel` int(11) DEFAULT NULL,
  `umur` int(11) DEFAULT NULL,
  `pendidikan` int(11) DEFAULT NULL,
  `masih_sekolah` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bl_dok`
--

CREATE TABLE `bl_dok` (
  `id_bl` varchar(25) DEFAULT NULL,
  `id_bs` varchar(25) DEFAULT NULL,
  `id_dsrt` varchar(25) DEFAULT NULL,
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
  `id_bs` varchar(25) DEFAULT NULL,
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
-- Table structure for table `bs_lk`
--

CREATE TABLE `bs_lk` (
  `id_bs` varchar(25) DEFAULT NULL,
  `tw` varchar(2) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nbs` varchar(4) DEFAULT NULL,
  `nks` varchar(5) DEFAULT NULL,
  `kd_sls` varchar(6) DEFAULT NULL,
  `nama_sls` text DEFAULT NULL,
  `waktu_tarik_sample` varchar(27) DEFAULT NULL,
  `nama_prov` text DEFAULT NULL,
  `nama_kab` text DEFAULT NULL,
  `nama_kec` text DEFAULT NULL,
  `nama_desa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bs_s`
--

CREATE TABLE `bs_s` (
  `id_bs` varchar(25) DEFAULT NULL,
  `tw` varchar(2) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nbs` varchar(4) DEFAULT NULL,
  `nks` varchar(25) DEFAULT NULL,
  `kd_sls` varchar(6) DEFAULT NULL,
  `nama_sls` text DEFAULT NULL,
  `waktu_tarik_sample` varchar(27) DEFAULT NULL,
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
  `id_bs` varchar(25) DEFAULT NULL,
  `id_dsrt` varchar(25) DEFAULT NULL,
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
-- Table structure for table `dsrt_lk`
--

CREATE TABLE `dsrt_lk` (
  `id_bs` varchar(25) DEFAULT NULL,
  `id_dsrt` varchar(25) DEFAULT NULL,
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
  `no_sample_utama` varchar(15) DEFAULT NULL,
  `no_sample_yang_digantikan` varchar(25) DEFAULT NULL,
  `hasil_pencacahan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dsrt_s`
--

CREATE TABLE `dsrt_s` (
  `id_bs` varchar(25) DEFAULT NULL,
  `id_dsrt` varchar(25) DEFAULT NULL,
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
  `jml_art` varchar(7) DEFAULT NULL,
  `jenis` varchar(5) DEFAULT NULL,
  `no_sample_utama` varchar(15) DEFAULT NULL,
  `no_sample_yang_digantikan` varchar(25) DEFAULT NULL,
  `hasil_pencacahan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `entribl`
--

CREATE TABLE `entribl` (
  `id_bs` varchar(25) NOT NULL,
  `tw` varchar(2) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nks` varchar(25) NOT NULL,
  `id_dsrt` varchar(25) NOT NULL,
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
-- Table structure for table `entrilk`
--

CREATE TABLE `entrilk` (
  `id_bs` varchar(25) DEFAULT NULL,
  `tw` varchar(2) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nks` varchar(5) DEFAULT NULL,
  `id_dsrt` varchar(25) DEFAULT NULL,
  `no_ruta` varchar(7) DEFAULT NULL,
  `no_bangunan` varchar(11) DEFAULT NULL,
  `no_sample` varchar(9) DEFAULT NULL,
  `nama_krt` text DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `gol` text DEFAULT NULL,
  `pendidikan` text DEFAULT NULL,
  `jml_art` int(11) DEFAULT NULL,
  `jenis` text DEFAULT NULL,
  `no_sample_utama` varchar(15) DEFAULT NULL,
  `hasil_pencacahan` text DEFAULT NULL,
  `jml_kualitas` int(11) DEFAULT NULL,
  `flag_error` varchar(10) DEFAULT NULL,
  `lock_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `entris`
--

CREATE TABLE `entris` (
  `id_bs` varchar(25) NOT NULL,
  `tw` varchar(2) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nks` varchar(25) NOT NULL,
  `id_dsrt` varchar(25) NOT NULL,
  `no_ruta` varchar(7) DEFAULT NULL,
  `no_bangunan` varchar(11) DEFAULT NULL,
  `no_sample` varchar(9) DEFAULT NULL,
  `nama_krt` text DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `gol` text DEFAULT NULL,
  `pendidikan` text DEFAULT NULL,
  `jml_art` varchar(7) DEFAULT NULL,
  `jenis` varchar(5) DEFAULT NULL,
  `no_sample_utama` varchar(15) DEFAULT NULL,
  `hasil_pencacahan` text DEFAULT NULL,
  `flag_error` varchar(10) DEFAULT NULL,
  `lock_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lk_detil`
--

CREATE TABLE `lk_detil` (
  `id_lk` varchar(25) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `kd_kualitas` varchar(25) DEFAULT NULL,
  `jenis_beli` text DEFAULT NULL,
  `jenis_lain` text DEFAULT NULL,
  `jml_beli` decimal(15,3) DEFAULT NULL,
  `jml_lain` decimal(15,3) DEFAULT NULL,
  `nilai_beli` bigint(20) DEFAULT NULL,
  `nilai_lain` bigint(20) DEFAULT NULL,
  `kd_entri` varchar(25) DEFAULT NULL,
  `is_delete` varchar(9) DEFAULT NULL,
  `nama_komoditas` text DEFAULT NULL,
  `nama_kualitas` text DEFAULT NULL,
  `satuan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lk_dok`
--

CREATE TABLE `lk_dok` (
  `id_lk` varchar(25) DEFAULT NULL,
  `id_bs` varchar(25) DEFAULT NULL,
  `id_dsrt` varchar(25) DEFAULT NULL,
  `triwulan` varchar(8) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nbs` varchar(4) DEFAULT NULL,
  `nks` varchar(5) DEFAULT NULL,
  `no_ruta` varchar(7) DEFAULT NULL,
  `nama_krt` text DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `b221` varchar(4) DEFAULT NULL,
  `b222` varchar(4) DEFAULT NULL,
  `b241_tgl` varchar(8) DEFAULT NULL,
  `b241_bln` varchar(8) DEFAULT NULL,
  `b242_tgl` varchar(8) DEFAULT NULL,
  `b242_bln` varchar(8) DEFAULT NULL,
  `b9_catatan` text DEFAULT NULL,
  `flag_error` varchar(10) DEFAULT NULL,
  `creator` varchar(13) DEFAULT NULL,
  `modifier` varchar(13) DEFAULT NULL,
  `createdate` varchar(23) DEFAULT NULL,
  `modifydate` varchar(23) DEFAULT NULL,
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
-- Table structure for table `nks`
--

CREATE TABLE `nks` (
  `id_bs` varchar(25) NOT NULL,
  `nks` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `nks_lk`
--

CREATE TABLE `nks_lk` (
  `id_bs` varchar(25) DEFAULT NULL,
  `nks` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `nks_s`
--

CREATE TABLE `nks_s` (
  `id_bs` varchar(25) DEFAULT NULL,
  `nks` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `range_harga`
--

CREATE TABLE `range_harga` (
  `kd_kualitas` varchar(25) DEFAULT NULL,
  `nama_kualitas` text DEFAULT NULL,
  `batas_min` decimal(15,3) DEFAULT NULL,
  `batas_max` decimal(15,3) DEFAULT NULL,
  `existing_min` decimal(15,3) DEFAULT NULL,
  `existing_max` decimal(15,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `s_b6`
--

CREATE TABLE `s_b6` (
  `id_s` varchar(25) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `kd_kualitas` varchar(25) DEFAULT NULL,
  `jml` decimal(15,3) DEFAULT NULL,
  `nilai` bigint(20) DEFAULT NULL,
  `cara` varchar(4) DEFAULT NULL,
  `jenis` varchar(5) DEFAULT NULL,
  `kd_entri` varchar(25) DEFAULT NULL,
  `is_bl` varchar(5) DEFAULT NULL,
  `nama_komoditas` text DEFAULT NULL,
  `nama_kualitas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `s_b7`
--

CREATE TABLE `s_b7` (
  `id_s` varchar(25) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `kd_kualitas` varchar(25) DEFAULT NULL,
  `nilai` bigint(20) DEFAULT NULL,
  `kd_entri` varchar(25) DEFAULT NULL,
  `is_bl` varchar(5) DEFAULT NULL,
  `nama_komoditas` text DEFAULT NULL,
  `nama_kualitas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `s_b41`
--

CREATE TABLE `s_b41` (
  `id_s` varchar(25) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `no_urut` varchar(7) DEFAULT NULL,
  `nama` text DEFAULT NULL,
  `hubungan` varchar(8) DEFAULT NULL,
  `jenkel` varchar(6) DEFAULT NULL,
  `umur` int(11) DEFAULT NULL,
  `perkawinan` varchar(10) DEFAULT NULL,
  `pendidikan` varchar(10) DEFAULT NULL,
  `masih_sekolah` varchar(13) DEFAULT NULL,
  `angkutan_sekolah` varchar(16) DEFAULT NULL,
  `pesan_angkutan_sekolah` varchar(22) DEFAULT NULL,
  `bekerja` varchar(7) DEFAULT NULL,
  `pekerjaan` varchar(9) DEFAULT NULL,
  `angkutan_bekerja` varchar(16) DEFAULT NULL,
  `pesan_angkutan_bekerja` varchar(22) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `s_b81`
--

CREATE TABLE `s_b81` (
  `id_s` varchar(25) DEFAULT NULL,
  `id` int(2) DEFAULT NULL,
  `no_urut` varchar(7) DEFAULT NULL,
  `nama` text DEFAULT NULL,
  `pekerjaan_utama` text DEFAULT NULL,
  `pekerjaan_tambahan` text DEFAULT NULL,
  `gaji` bigint(20) DEFAULT NULL,
  `honor` bigint(20) DEFAULT NULL,
  `jumlah` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `s_dok`
--

CREATE TABLE `s_dok` (
  `id_s` varchar(12) DEFAULT NULL,
  `id_bs` varchar(9) DEFAULT NULL,
  `id_dsrt` varchar(7) DEFAULT NULL,
  `triwulan` varchar(8) DEFAULT NULL,
  `kd_prov` varchar(7) DEFAULT NULL,
  `kd_kab` varchar(6) DEFAULT NULL,
  `kd_kec` varchar(6) DEFAULT NULL,
  `kd_desa` varchar(7) DEFAULT NULL,
  `nbs` varchar(4) DEFAULT NULL,
  `nks` varchar(5) DEFAULT NULL,
  `no_ruta` varchar(7) DEFAULT NULL,
  `nama_krt` text DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `gol` varchar(3) DEFAULT NULL,
  `b21` varchar(3) DEFAULT NULL,
  `b22` varchar(3) DEFAULT NULL,
  `b23` varchar(3) DEFAULT NULL,
  `b24` varchar(3) DEFAULT NULL,
  `b321` varchar(4) DEFAULT NULL,
  `b322` varchar(4) DEFAULT NULL,
  `b341_tgl` varchar(8) DEFAULT NULL,
  `b341_bln` varchar(8) DEFAULT NULL,
  `b342_tgl` varchar(8) DEFAULT NULL,
  `b342_bln` varchar(8) DEFAULT NULL,
  `b43` varchar(3) DEFAULT NULL,
  `b43_sopir` varchar(9) DEFAULT NULL,
  `b43_satpam` varchar(10) DEFAULT NULL,
  `b43_asisten` varchar(11) DEFAULT NULL,
  `b43_babysitter` varchar(14) DEFAULT NULL,
  `b43_lainnya` varchar(11) DEFAULT NULL,
  `b5_01` varchar(5) DEFAULT NULL,
  `b5_02` varchar(5) DEFAULT NULL,
  `b5_03` varchar(5) DEFAULT NULL,
  `b5_04` varchar(5) DEFAULT NULL,
  `b5_05` varchar(5) DEFAULT NULL,
  `b5_06` varchar(5) DEFAULT NULL,
  `b5_07` varchar(5) DEFAULT NULL,
  `b5_08a` varchar(6) DEFAULT NULL,
  `b5_08b` varchar(6) DEFAULT NULL,
  `b5_09a` varchar(6) DEFAULT NULL,
  `b5_09b` varchar(6) DEFAULT NULL,
  `b5_10a` varchar(6) DEFAULT NULL,
  `b5_10b` varchar(6) DEFAULT NULL,
  `b5_11a` varchar(6) DEFAULT NULL,
  `b5_11b` varchar(6) DEFAULT NULL,
  `b5_12_mobil` varchar(11) DEFAULT NULL,
  `b5_12_motor` varchar(11) DEFAULT NULL,
  `b5_12_tv` varchar(8) DEFAULT NULL,
  `b5_12_ac` varchar(8) DEFAULT NULL,
  `b5_12_internet` varchar(14) DEFAULT NULL,
  `b5_12_telepon_rumah` varchar(19) DEFAULT NULL,
  `b5_12_telepon_seluler` varchar(21) DEFAULT NULL,
  `b5_13` varchar(5) DEFAULT NULL,
  `b5_14a` varchar(6) DEFAULT NULL,
  `b5_14b` varchar(6) DEFAULT NULL,
  `b5_15` varchar(5) DEFAULT NULL,
  `b5_16` varchar(5) DEFAULT NULL,
  `b82_01` text DEFAULT NULL,
  `b82_02` text DEFAULT NULL,
  `b82_03` text DEFAULT NULL,
  `b82_04` text DEFAULT NULL,
  `b82_05` text DEFAULT NULL,
  `b82_06` text DEFAULT NULL,
  `b82_07` text DEFAULT NULL,
  `b83_01` text DEFAULT NULL,
  `b83_02` text DEFAULT NULL,
  `b83_03` text DEFAULT NULL,
  `b83_04` text DEFAULT NULL,
  `b83_05` text DEFAULT NULL,
  `b83_06` text DEFAULT NULL,
  `b83_07` text DEFAULT NULL,
  `b83_08` text DEFAULT NULL,
  `b83_09` text DEFAULT NULL,
  `b83_10` text DEFAULT NULL,
  `b84_01` text DEFAULT NULL,
  `b84_02` text DEFAULT NULL,
  `b84_03` text DEFAULT NULL,
  `b84_04` text DEFAULT NULL,
  `b84_05` text DEFAULT NULL,
  `b84_06` text DEFAULT NULL,
  `b84_07` text DEFAULT NULL,
  `b9_catatan` text DEFAULT NULL,
  `flag_error` text DEFAULT NULL,
  `creator` text DEFAULT NULL,
  `modifier` text DEFAULT NULL,
  `createdate` varchar(23) DEFAULT NULL,
  `modifydate` varchar(23) DEFAULT NULL,
  `is_bl_done` varchar(10) DEFAULT NULL,
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entribl`
--
ALTER TABLE `entribl`
  ADD PRIMARY KEY (`id_bs`,`nks`,`id_dsrt`);

--
-- Indexes for table `entris`
--
ALTER TABLE `entris`
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
