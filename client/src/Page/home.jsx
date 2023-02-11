import React from 'react';
import { Link} from 'react-router-dom';


const Home = () => {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/home" className="nav-link">
                    <p>Home</p>
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-primary">
                <h3 className="card-title">Dashboard</h3>
              </div>
              <div className="card-body">
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
