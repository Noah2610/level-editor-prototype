#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

mod routes;

use rocket::Rocket;

pub const STATIC_DIR: &'static str = "static/";

fn main() {
    rocket().launch();
}

fn rocket() -> Rocket {
  rocket::ignite()
    .mount("/", routes::routes())
}
