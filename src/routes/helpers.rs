use std::path::Path;

use rocket::response::NamedFile;
use rocket::State;

use crate::STATIC_DIR;

type StaticFile = Option<NamedFile>;

pub fn get_static(filepath: &str) -> StaticFile {
    println!("{}", filepath);
    NamedFile::open(
        Path::new(STATIC_DIR).join(filepath)
    ).ok()
}

pub fn get_html(filename: &str) -> StaticFile {
    get_static(&format!("html/{}", filename))
}
