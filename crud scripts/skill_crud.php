<?php
require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';

// Add a new skill
function addSkill($user_id, $skill_name, $proficiency) {
    global $conn;
    $sql = "INSERT INTO skills (user_id, skill_name, proficiency) VALUES ($1, $2, $3)";
    $params = array($user_id, $skill_name, $proficiency);
    $result = pg_query_params($conn, $sql, $params);
    return $result;
}

// Update a skill
function updateSkill($id, $skill_name, $proficiency) {
    global $conn;
    $sql = "UPDATE skills SET skill_name=$1, proficiency=$2 WHERE id=$3";
    $params = array($skill_name, $proficiency, $id);
    $result = pg_query_params($conn, $sql, $params);
    return $result;
}

// Delete a skill
function deleteSkill($id) {
    global $conn;
    $sql = "DELETE FROM skills WHERE id=$1";
    $params = array($id);
    $result = pg_query_params($conn, $sql, $params);
    return $result;
}

// List all skills
function listSkills($user_id = null) {
    global $conn;
    $skills = [];
    if ($user_id) {
        $sql = "SELECT * FROM skills WHERE user_id=$1";
        $params = array($user_id);
        $result = pg_query_params($conn, $sql, $params);
        if ($result) {
            while ($row = pg_fetch_assoc($result)) {
                $skills[] = $row;
            }
        }
    } else {
        $sql = "SELECT * FROM skills";
        $result = pg_query($conn, $sql);
        if ($result) {
            while ($row = pg_fetch_assoc($result)) {
                $skills[] = $row;
            }
        }
    }
    return $skills;
}
?>