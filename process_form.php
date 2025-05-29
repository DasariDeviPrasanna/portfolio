<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $message = sanitize_input($_POST['message']);
    $timestamp = date('Y-m-d H:i:s');

    // Create or load the Excel file
    $excelFile = 'contact_submissions.xlsx';
    
    try {
        if (file_exists($excelFile)) {
            $spreadsheet = IOFactory::load($excelFile);
            $sheet = $spreadsheet->getActiveSheet();
        } else {
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            
            // Set headers
            $sheet->setCellValue('A1', 'Timestamp');
            $sheet->setCellValue('B1', 'Name');
            $sheet->setCellValue('C1', 'Email');
            $sheet->setCellValue('D1', 'Message');
            
            // Style headers
            $sheet->getStyle('A1:D1')->getFont()->setBold(true);
        }

        // Find the next empty row
        $row = $sheet->getHighestRow() + 1;

        // Add the new data
        $sheet->setCellValue('A' . $row, $timestamp);
        $sheet->setCellValue('B' . $row, $name);
        $sheet->setCellValue('C' . $row, $email);
        $sheet->setCellValue('D' . $row, $message);

        // Auto-size columns
        foreach (range('A', 'D') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Save the file
        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save($excelFile);

        // Send success response
        echo json_encode(['status' => 'success', 'message' => 'Thank you for your message!']);
    } catch (Exception $e) {
        // Send error response
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error processing your request.']);
    }
} else {
    // Not a POST request
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
?> 