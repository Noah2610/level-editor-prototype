mod helpers;

use std::path::PathBuf;

use rocket::Route;
use rocket::response::NamedFile;
use rocket::State;

use self::helpers::*;

pub fn routes() -> Vec<Route> {
    routes![
        index,
        resource,
    ]
}

#[get("/")]
pub fn index() -> NamedFile {
    get_html("index.html").unwrap()
}

#[get("/res/<path..>")]
pub fn resource(path: PathBuf) -> Option<NamedFile> {
    get_static(path.to_str().unwrap())
}
