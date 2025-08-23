const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className=" w-full bg-[#fc8673] text-white py-6 text-center text-sm font-semibold">
      © {currentYear} Meet2Sheet. All rights reserved.
    </footer>
  );
}
