function AlbumWidget() {
  return (
    <div className="list-group my-5">
      <div className="list-group-item">
        <div className="d-flex justify-content-between mt-2">
          <span className="">Album</span>
          <a href="#index" className="text-black link-danger">
            See All
          </a>
        </div>
        <hr />
        <div className="list-group list-group-flush">
          <a href="#widget" className="list-group-item list-group-item-action">
            <div className="row align-items-center">
              <div className="col-md-2">
                <img
                  className=""
                  src={require("./assets/p.jpg")}
                  style={{ width: "50px", height: "50px" }}
                  alt="album"
                />
              </div>
              <div className="col mt-2 ps-4">
                <p className="m-0">Album Title</p>
                <p className="text-muted">2022</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AlbumWidget;
