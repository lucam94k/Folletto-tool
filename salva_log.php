<?php
// Imposta il fuso orario italiano
date_default_timezone_set("Europe/Rome");

// Riceve i dati inviati in JSON dal browser
$data = json_decode(file_get_contents("php://input"), true);

// Se esiste il campo "log" allora lo salva
if ($data && isset($data["log"])) {
    // Aggiunge la data server-side per sicurezza
    $timestamp = date("Y-m-d H:i:s");

    // Prepara il log finale da salvare
    $logEntry = "=========== NUOVA VISITA ===========
Data server: $timestamp
" . $data["log"] . "\n";

    // Salva tutto nel file "visite_log.txt"
    file_put_contents("visite_log.txt", $logEntry, FILE_APPEND);
}
?>
