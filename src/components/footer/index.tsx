import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="text-center text-dark" style={{backgroundColor: '#332FD0'}}>
                <div className="container pt-4">
                    <section className="mb-4">
                        <a
                            className="btn btn-link btn-floating btn-lg text-warning m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-facebook-f"></i
                        ></a>

                        <a
                            className="btn btn-link btn-floating btn-lg text-warning m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-twitter"></i
                        ></a>

                        <a
                            className="btn btn-link btn-floating btn-lg text-warning m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-google"></i
                        ></a>

                        <a
                            className="btn btn-link btn-floating btn-lg text-warning m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-instagram"></i
                        ></a>

                        <a
                            className="btn btn-link btn-floating btn-lg text-warning m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-linkedin"></i
                        ></a>
                        <a
                            className="btn btn-link btn-floating btn-lg text-warning m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-github"></i
                        ></a>
                    </section>
                </div>

                <div className="text-center text-light p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    © 2020 Copyright:
                    <a className="text-light" href="#">HMS.com</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer
