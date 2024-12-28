package smart.city.parking.management.system.db.services;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.dtos.ReportDriverDTO;
import smart.city.parking.management.system.db.repositories.DriverRepository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final ResourceLoader resourceLoader;
    private final DriverRepository driverRepository;

    public ReportService(ResourceLoader resourceLoader, DriverRepository driverRepository) {
        this.resourceLoader = resourceLoader;
        this.driverRepository = driverRepository;
    }

    public byte[] generateReport() {
        List<ReportDriverDTO> driverList = driverRepository.findTop20DriversByReservations();
        try {
            // Load the JRXML template
            InputStream reportStream = resourceLoader.getResource("classpath:reporting/JasperTemplate.xml").getInputStream();

            // Compile the JRXML file into a JasperReport
            JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

            // Create data source from the list
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(driverList);

            // Parameters (can be empty if you do not have any parameters to pass)
            Map<String, Object> parameters = new HashMap<>();

            // Fill the report with data
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            // Export the report to a byte array
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            JasperExportManager.exportReportToPdfStream(jasperPrint, byteArrayOutputStream);

            return byteArrayOutputStream.toByteArray();

        } catch (JRException | IOException e) {
            throw new RuntimeException("Failed to generate report", e);
        }
    }
}
