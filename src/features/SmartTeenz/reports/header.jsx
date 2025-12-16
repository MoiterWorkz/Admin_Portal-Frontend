const Header = ({ Icon, title, subtitle }) => {
  return (
    <div className="w-full rounded-xl p-6 table-card">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center icon-round">
          <Icon className="w-6 h-6 text-chart-5" />
        </div>

        <div>
          <h1 className="user-table-header primary-color">{title}</h1>
          <p className="root-sub-header mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
