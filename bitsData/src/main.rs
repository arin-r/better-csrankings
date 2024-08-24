use serde_json::Value;
use std::collections::HashMap;
use std::fs::File;
use std::io::{Read, Write};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut file = File::open("src\\websiteDataAffiliation.json")?;
    let mut data = String::new();
    file.read_to_string(&mut data)?;

    let json: Value = serde_json::from_str(&data)?;

    let bits_pilani_goa = &json["BITS Pilani-Goa"]["years"];

    let mut authors_fields: HashMap<String, Vec<String>> = HashMap::new();

    if let Some(years) = bits_pilani_goa.as_object() {
        for (_year, entries) in years {
            if let Some(entries_array) = entries.as_array() {
                for entry in entries_array {
                    if let Some(author) = entry["author"].as_str() {
                        if let Some(fields) = entry["FOR"].as_array() {
                            for field in fields {
                                if let Some(field_str) = field.as_str() {
                                    authors_fields
                                        .entry(author.to_string())
                                        .or_insert_with(Vec::new)
                                        .push(field_str.to_string());
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Write the authors and their fields to an output text file
    let mut file = File::create("output.txt")?;
    for (author, fields) in &authors_fields {
        writeln!(file, "{}: {:?}", author, fields)?;
    }

    // Serialize the authors_fields HashMap to JSON and save it to a file
    let json_output = serde_json::to_string_pretty(&authors_fields)?;
    let mut file = File::create("data.json")?;
    file.write_all(json_output.as_bytes())?;

    // Optionally, save the output to a different file
    let mut file = File::create("../bitsGoaProfs.json")?;
    file.write_all(json_output.as_bytes())?;
    Ok(())
}
