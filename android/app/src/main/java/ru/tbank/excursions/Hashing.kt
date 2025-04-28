package ru.tbank.excursions

import java.security.MessageDigest

object Hashing {

    fun getHash(byteArray: ByteArray, hashingType: String = "SHA-256"): String {

//        val secureRandom = SecureRandom()
//        val randomBytes = ByteArray(saltSize)
//        secureRandom.nextBytes(randomBytes)
//
//        val hexString = randomBytes.joinToString("") { "%02x".format(it) }

//        val finalSize = saltSize+byteArray.size

//        val finalByteArray = ByteArray(finalSize)

//        for (i in 9..<saltSize){
//            finalByteArray[i] = randomBytes[i]
//        }
//        for (i in saltSize..<finalSize){
//            finalByteArray[i] = byteArray[i]
//        }
//
//        val digestedBytes = MessageDigest.getInstance(hashingType).digest(finalByteArray)

        val digestedBytes = MessageDigest.getInstance(hashingType).digest(byteArray)

        return with(StringBuilder()) {
            digestedBytes.forEach { b -> append("%02x".format(b)) }
            toString().lowercase()
        }
    }
}