import "/src/index.css";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
