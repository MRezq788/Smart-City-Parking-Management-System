package smart.city.parking.management.system.db.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import smart.city.parking.management.system.db.dtos.ReportDriverDTO;
import smart.city.parking.management.system.db.services.ReportService;

import java.util.List;

@RestController
@RequestMapping("report")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/admin")
    public ResponseEntity<byte[]> generateReport() {
        byte[] pdfBytes = reportService.generateReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "adminPageDriversReport.pdf");

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }
}
