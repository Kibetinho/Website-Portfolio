<?php
require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';

// Add a new project
function addProject($user_id, $title, $description, $image = null) {
    global $conn;
    $sql = "INSERT INTO projects (user_id, title, description, image) VALUES ($1, $2, $3, $4)";
    $params = array($user_id, $title, $description, $image);
    $result = pg_query_params($conn, $sql, $params);
    return $result;
}

// Update a project
function updateProject($id, $title, $description, $image = null) {
    global $conn;
    $sql = "UPDATE projects SET title=$1, description=$2, image=$3 WHERE id=$4";
    $params = array($title, $description, $image, $id);
    $result = pg_query_params($conn, $sql, $params);
    return $result;
}

// Delete a project
function deleteProject($id) {
    global $conn;
    $sql = "DELETE FROM projects WHERE id=$1";
    $params = array($id);
    $result = pg_query_params($conn, $sql, $params);
    return $result;
}

// List all projects
function listProjects() {
    global $conn;
    $sql = "SELECT * FROM projects";
    $result = pg_query($conn, $sql);
    $projects = [];
    if ($result) {
        while ($row = pg_fetch_assoc($result)) {
            $projects[] = $row;
        }
    }
    return $projects;
}
?>