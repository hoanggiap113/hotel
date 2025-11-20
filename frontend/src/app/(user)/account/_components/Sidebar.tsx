export default function AccountSidebar() {
  return (
    <>
      <aside className="w-64 bg-white shadow-sm rounded-xl h-[calc(100vh-40rem)] p-4 sticky top-20">
        {/* Bạn tự nhét menu vào */}
        <div className="space-y-2 text-sm">
          <div className="font-semibold text-gray-700">Đơn đặt chỗ của tôi</div>
          <div className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            Mọi đơn đặt chỗ
          </div>
          <div className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            Khách sạn
          </div>
          {/* ... */}
        </div>
      </aside>
    </>
  );
}
