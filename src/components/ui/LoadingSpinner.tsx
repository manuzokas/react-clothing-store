interface Props {
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<Props> = ({ fullScreen }) => {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-90"
          : "flex items-center justify-center"
      }
    >
      <div className="relative w-16 h-16">
        {/* Anel externo */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>

        {/* Anel animado */}
        <div className="absolute inset-0 border-4 border-t-black border-transparent rounded-full animate-spin"></div>

        {/* Texto opcional (opcional) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-black">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
