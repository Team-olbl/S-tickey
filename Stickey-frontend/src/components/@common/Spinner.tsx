import useSpinner from "../../stores/useSpinner";


const Spinner = () => {
    const { isLoading } = useSpinner();
  
    if (isLoading) {
      return (
        <>
          <div className="absolute h-full w-full bg-black/50 z-20" onClick={e => e.stopPropagation()} />
          <div className="z-50 absolute left-0 right-0 top-0 bottom-0 m-auto flex justify-center items-center">
            <div className="relative inline-flex">
              <div className="w-8 h-8 bg-Stickey_GREEN rounded-full"></div>
              <div className="w-8 h-8 bg-Stickey_GREEN rounded-full absolute top-0 left-0 animate-ping"></div>
              <div className="w-8 h-8 bg-Stickey_GREEN rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
          </div>
          {/* <div className="loader w-12 h-12 absolute left-0 right-0 top-0 bottom-0 m-auto border-t-4 border-blue-600 rounded-full z-50 animate-spin" /> */}
        </>
      );
    } else {
      return <></>;
    }
  };

  export default Spinner;