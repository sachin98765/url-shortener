/* apiUrls.js ------------------------------------------------------------- */
import { UAParser } from "ua-parser-js"
import supabase, { supabaseUrl } from "./supabase"


/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

/**
 * Generate a random slug and make sure it doesn’t already exist
 * in the `urls.short_url` column. Retries up to 10 times.
 */
async function generateUniqueShortUrl(length = 6, maxTries = 10) {
  for (let i = 0; i < maxTries; i++) {
    const slug = Math.random()
      .toString(36)
      .substring(2, 2 + length)

    const { data, error } = await supabase
      .from("urls")
      .select("id")
      .eq("short_url", slug)
      .maybeSingle() // returns null if not found

    if (error) {
      console.error(error.message)
      throw new Error("Couldn’t check slug uniqueness")
    }

    if (!data) return slug // slug is free, use it
  }
  throw new Error("Failed to generate a unique short URL – try again.")
}

/* ------------------------------------------------------------------ */
/*  CRUD                                                              */
/* ------------------------------------------------------------------ */

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id)

  if (error) {
    console.error(error.message)
    throw new Error("Unable to load URLs")
  }

  return data
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id)

  if (error) {
    console.error(error.message)
    throw new Error("Unable to delete URL")
  }

  return data
}

/**
 * Create a new shortened URL + QR‑code.
 * @param {Object}  payload   { title, longUrl, customUrl, user_id }
 * @param {Blob}    qrcode    PNG blob generated from canvas
 */
export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  /* 1. Generate a unique slug ------------------------------------------------ */
  const short_url = await generateUniqueShortUrl(6) // 6‑char slug

  /* 2. Upload QR code to Supabase Storage ------------------------------------ */
  const fileName = `qr-${short_url}.png`

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode, {
      contentType: "image/png",
      upsert: false, // never overwrite
    })

  if (storageError) {
    console.error(storageError.message)
    throw new Error("Failed to upload QR code")
  }

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`

  /* 3. Insert URL record ------------------------------------------------------ */
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
      },
    ])
    .select()

  if (error) {
    console.error(error.message)
    // If we hit here, we might want to delete the QR file to keep storage clean
    throw new Error("Error creating short URL")
  }

  return data // newly created row
}

export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (error) {
    console.error(error.message)
    throw new Error("Error Fetching Short Link")
  }

  return data
}

export async function getUrl({id,user_id}) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id",id)
    .eq("user_id",user_id)
    .single();

  if (error) {
    console.error(error.message)
    throw new Error("Short Url Not Found")
  }

  return data
}




















/*-----This is the code 2-------*/

// import supabase,{supabaseUrl} from "./supabase"

// export async function getUrls(user_id) {
//   const { data, error } = await supabase
//     .from("urls")
//     .select("*")
//     .eq("user_id", user_id)

//   if (error) {
//     console.error(error.message)
//     throw new Error("Unable to load URLs")
//   }

//   return data
// }

// export async function deleteUrl(id) {
//   const { data, error } = await supabase.from("urls").delete().eq("id", id)

//   if (error) {
//     console.error(error.message)
//     throw new Error("Unable to load URLs")
//   }

//   return data
// }

// export async function createUrl(
//   { title, longUrl, customUrl, user_id },
//   qrcode
// ) {

//   const short_url = Math.random().toString(36).substring(2, 6)
//   const fileName = `qr-${short_url}`
//   const { error: storageError } = await supabase.storage
//     .from("qrs")
//     .upload(fileName, qrcode)

//   if (storageError) throw new Error(storageError.message)

//     const qr= `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

//   const { data, error } = await supabase.from("urls").insert([
//     {
//         title,
//         original_url:longUrl,
//         custom_url:customUrl || null,
//         user_id,
//         short_url,
//         qr,
//     }
//   ]).select();

//   if (error) {
//     console.error(error.message)
//     throw new Error("Error Creating Short URL")
//   }

//   return data
// }
