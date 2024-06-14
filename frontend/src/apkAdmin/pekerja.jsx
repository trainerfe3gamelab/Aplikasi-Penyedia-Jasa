import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Pekerja = () => {
  const [pekerja, setPekerja] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPekerja, setCurrentPekerja] = useState(null);
  const [editNama, setEditNama] = useState("");
  const [editAlamat, setEditAlamat] = useState("");
  const [editKontak, setEditKontak] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/tampilpekerjaadmin");
      const data = await response.json();
      setPekerja(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditPekerja = (pekerja) => {
    setCurrentPekerja(pekerja);
    setEditNama(pekerja.nama_pekerja);
    setEditAlamat(pekerja.alamat);
    setEditKontak(pekerja.kontak);
    setIsModalOpen(true);
  };

  const handleSimpanEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/editpekerjaadmin/${currentPekerja.id_pekerja}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama_pekerja: editNama,
            alamat: editAlamat,
            kontak: editKontak,
          }),
        }
      );

      if (response.ok) {
        fetchData();
        setIsModalOpen(false);
      } else {
        console.error("Error updating data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleHapusPekerja = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/hapuspekerja/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(result.message); // success message
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  const filteredPekerja = pekerja.filter(
    (pekerjaan) =>
      pekerjaan.nama_pekerja.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pekerjaan.alamat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pekerjaan.kontak.includes(searchQuery)
  );

  const displayedPekerja = filteredPekerja.slice(0, itemsPerPage);

  return (
    <div className="container mx-auto p-6 min-h-[300vh]">
      <h2 className="text-2xl font-bold mb-4">Daftar Pekerja</h2>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Cari..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-8"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-gray-700">
              <FaSearch className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => navigate("/tambahPekerja")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Tambah
          </button>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Alamat</th>
            <th className="px-4 py-2">No HP</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {displayedPekerja.map((pekerjaan, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{pekerjaan.nama_pekerja}</td>
              <td className="border px-4 py-2">{pekerjaan.alamat}</td>
              <td className="border px-4 py-2">{pekerjaan.kontak}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEditPekerja(pekerjaan)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleHapusPekerja(pekerjaan.id_pekerja)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Pekerja"
      >
        <h2 className="text-xl font-bold mb-4">Edit Pekerja</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama
            </label>
            <input
              type="text"
              value={editNama}
              onChange={(e) => setEditNama(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Alamat
            </label>
            <input
              type="text"
              value={editAlamat}
              onChange={(e) => setEditAlamat(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              No HP
            </label>
            <input
              type="text"
              value={editKontak}
              onChange={(e) => setEditKontak(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="button"
            onClick={handleSimpanEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Batal
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Pekerja;
