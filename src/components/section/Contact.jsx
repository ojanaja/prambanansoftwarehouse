import { useState } from "react";
import { sendEmail } from "@/helper/sendEmail";
import { toast } from "sonner";

export default function ContactSection() {
  const [selectedApp, setSelectedApp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    appType: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedApp(event.target.value);
    setFormData({ ...formData, appType: event.target.value });
  };

  const handleWhatsappInput = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, whatsapp: event.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    const templateParams = {
      to_name: "Admin",
      from_name: formData.name,
      email: formData.email,
      no_whatsapp: formData.whatsapp,
      jenis_aplikasi: formData.appType,
    };

    try {
      const result = await sendEmail(templateParams);
      // console.log("Email sent successfully:", result.text);
      toast.success("Request Demo Berhasil Dikirim");
    } catch (error) {
      toast.error("Gagal Mengirim Request Demo");
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact">
      <div className="flex items-center justify-center md:py-[11%] md:px-[5%]">
        <div className="relative w-full max-w-5xl md:p-8 p-4 bg-cover bg-center md:rounded-3xl shadow-lg" style={{ backgroundImage: "url('form/background.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-50 md:rounded-3xl"></div>
          <div className="relative z-0 flex flex-col md:flex-row items-start justify-between p-8">
            <div className="text-white md:w-2/5">
              <h2 className="text-sm font-semibold mb-2">Optimalkan Bisnis Anda dengan Mudah</h2>
              <h1 className="text-4xl font-bold mb-4">Coba Aplikasi Kami Secara GRATIS!</h1>
              <p className="text-sm">Isi form berikut untuk dapatkan akses demo dan rasakan solusi efisien bagi operasional bisnis Anda.</p>
            </div>
            <div className="md:w-2/5 mt-8 md:mt-0">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nama"
                    className="w-full p-3 bg-gray-700 bg-opacity-50 text-white rounded-md focus:outline-none placeholder:text-white"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleWhatsappInput}
                    inputMode="numeric"
                    placeholder="No Whatsapp"
                    className="w-full p-3 bg-gray-700 bg-opacity-50 text-white rounded-md focus:outline-none placeholder:text-white"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email (Optional)"
                    className="w-full p-3 bg-gray-700 bg-opacity-50 text-white rounded-md focus:outline-none placeholder:text-white"
                  />
                </div>
                <div>
                  <select name="appType" value={formData.appType} onChange={handleSelectChange} className="w-full p-3 bg-gray-700 bg-opacity-50 text-white rounded-md focus:outline-none placeholder:text-white" required>
                    <option value="" disabled>
                      Pilih Jenis Aplikasi
                    </option>
                    <option value="Sistem Manajemen Kafe">Sistem Manajemen Kafe</option>
                    <option value="Sistem CRM Bisnis Properti">Sistem CRM Bisnis Properti</option>
                    <option value="Sistem Operasional Percetakan">Sistem Operasional Percetakan</option>
                    <option value="Sistem Manajemen Gudang">Sistem Manajemen Gudang</option>
                    <option value="Sistem Integrasi Bisnis Rental Mobil/Motor">Sistem Integrasi Bisnis Rental Mobil/Motor</option>
                    <option value="Aplikasi Tour and Travel">Aplikasi Tour and Travel</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Sistem Manajemen Yayasan">Sistem Manajemen Yayasan</option>
                  </select>
                </div>
                <button type="submit" className="w-full p-3 bg-red-600 text-white rounded-md" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
