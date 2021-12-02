import React from 'react'

function Portfolio() {
    return (
        <section className="page-section bg-light" id="portfolio">
                <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Portfolio</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-sm-6 mb-4">
                    {/*<!-- Portfolio item 1-->*/}
                    <div className="portfolio-item">
                        <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
                        <div className="portfolio-hover">
                            <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                        </div>
                        <img className="img-fluid" width="500px" height="500px"  src="assets/img/portfolio/1.jpg" alt="..." />
                        </a>
                        <div className="portfolio-caption">
                        <div className="portfolio-caption-heading">Classic Houses</div>
                        <div className="portfolio-caption-subheading text-muted">Illustration</div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 mb-4">
                    {/*<!-- Portfolio item 2-->*/}
                    <div className="portfolio-item">
                        <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal2">
                        <div className="portfolio-hover">
                            <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                        </div>
                        <img className="img-fluid" width="500px" height="500px" src="assets/img/portfolio/2.jpg" alt="..." />
                        </a>
                        <div className="portfolio-caption">
                        <div className="portfolio-caption-heading">Mordern Houses</div>
                        <div className="portfolio-caption-subheading text-muted">exclusive finishing</div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 mb-4">
                    {/*<!-- Portfolio item 3-->*/}
                    <div className="portfolio-item">
                        <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal3">
                        <div className="portfolio-hover">
                            <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                        </div>
                        <img className="img-fluid" width="500px" height="500px"  src="assets/img/portfolio/3.jpg" alt="..." />
                        </a>
                        <div className="portfolio-caption">
                        <div className="portfolio-caption-heading">Factories</div>
                        <div className="portfolio-caption-subheading text-muted">decent finishing</div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
                    {/*<!-- Portfolio item 4-->*/}
                    <div className="portfolio-item">
                        <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal4">
                        <div className="portfolio-hover">
                            <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                        </div>
                        <img className="img-fluid" width="500px" height="500px"  src="assets/img/portfolio/4.jpg" alt="..." />
                        </a>
                        <div className="portfolio-caption">
                        <div className="portfolio-caption-heading">Hospitles</div>
                        <div className="portfolio-caption-subheading text-muted">with all functions need</div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 mb-4 mb-sm-0">
                    {/*<!-- Portfolio item 5-->*/}
                    <div className="portfolio-item">
                        <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal5">
                        <div className="portfolio-hover">
                            <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                        </div>
                        <img className="img-fluid" width="500px" height="500px"  src="assets/img/portfolio/5.jpg" alt="..." />
                        </a>
                        <div className="portfolio-caption">
                        <div className="portfolio-caption-heading">shopping malls</div>
                        <div className="portfolio-caption-subheading text-muted">latest designs</div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                    {/*<!-- Portfolio item 6-->*/}
                    <div className="portfolio-item">
                        <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal6">
                        <div className="portfolio-hover">
                            <div className="portfolio-hover-content"><i className="fa fa-plus fa-3x"></i></div>
                        </div>
                        <img className="img-fluid" width="500px" height="500px"  src="assets/img/portfolio/6.jpg" alt="..." />
                        </a>
                        <div className="portfolio-caption">
                        <div className="portfolio-caption-heading">shopping malls</div>
                        <div className="portfolio-caption-subheading text-muted">reguler type as well</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
    )
}

export default Portfolio
