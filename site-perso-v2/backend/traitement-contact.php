<?php
// Configuration des en-têtes pour le retour JSON
header('Content-Type: application/json');

// Vérification de la méthode de requête
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données du formulaire
    $nom = htmlspecialchars(trim($_POST['nom']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validation des données
    if (empty($nom) || empty($email) || empty($message)) {
        echo json_encode([
            'statut' => 'erreur',
            'message' => 'Tous les champs sont requis.'
        ]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'statut' => 'erreur',
            'message' => 'Adresse email invalide.'
        ]);
        exit;
    }

    // Configuration de l'email
    $to = 'test@example.com'; // Change cette adresse par celle que tu veux tester avec MailHog
    $subject = 'Nouveau message depuis le formulaire de contact';
    $body = "Nom : $nom\nEmail : $email\nMessage :\n$message";
    $headers = "From: $email\r\nReply-To: $email";

    // Envoi de l'email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode([
            'statut' => 'succes',
            'message' => 'Votre message a été envoyé avec succès.'
        ]);
    } else {
        echo json_encode([
            'statut' => 'erreur',
            'message' => 'Une erreur s\'est produite lors de l\'envoi du message.'
        ]);
    }
} else {
    // Requête invalide
    echo json_encode([
        'statut' => 'erreur',
        'message' => 'Méthode non autorisée.'
    ]);
    exit;
}
?>
