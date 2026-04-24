import { jsPDF } from "jspdf";

export const generateCertificate = (donation) => {
  console.log("Generating certificate for:", donation);
  
  if (!donation) {
    console.error("No donation data provided to generateCertificate");
    return;
  }

  try {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Background color - light cream
    doc.setFillColor(252, 251, 246);
    doc.rect(0, 0, 297, 210, "F");

    // Premium Border
    doc.setDrawColor(31, 111, 93); // #1f6f5d
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);
    
    doc.setDrawColor(212, 175, 55); // Gold inner border
    doc.setLineWidth(1);
    doc.rect(14, 14, 269, 182);

    const userName = localStorage.getItem("userName") || "Valued Donor";
    const createdAt = donation.createdAt || new Date();
    const dateStr = new Date(createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Organization Header
    doc.setTextColor(31, 111, 93);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("SAVALI NIVARA NGO", 148.5, 40, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text("Certificate of Appreciation", 148.5, 52, { align: "center" });

    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(100, 58, 197, 58);

    // Main Text
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);
    doc.text("This certificate is proudly presented to", 148.5, 80, { align: "center" });

    // Donor Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.setTextColor(31, 111, 93);
    doc.text(userName, 148.5, 105, { align: "center" });

    // Appreciation Message
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    
    const type = donation.type || "generous";
    const typeText = type === 'money' ? 'Monetary Support' : `${type.toUpperCase()} Donation`;
    const amtText = donation.details?.amount ? ` of INR ${donation.details.amount}` : '';
    
    doc.text(`In deep appreciation for your generous ${typeText}${amtText},`, 148.5, 130, { align: "center" });
    doc.text(`which enables us to provide care and shelter to residents in need.`, 148.5, 140, { align: "center" });

    // Footer Details
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    
    doc.text(`Date: ${dateStr}`, 40, 170);
    const donationId = donation._id || "NEW-DONATION";
    doc.text(`Ref ID: ${donationId.toString().substring(0, 8).toUpperCase()}`, 40, 180);
    if(donation.branch) doc.text(`Branch: ${donation.branch}`, 40, 190);

    // Signature Mock
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(220, 175, 270, 175);
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 111, 93);
    doc.text("Authorized Signatory", 245, 182, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Savali Nivara Trust", 245, 188, { align: "center" });

    // Save the PDF
    const fileName = `Savali_Nivara_Certificate_${donationId.toString().substring(0, 6)}.pdf`;
    doc.save(fileName);
    console.log("Certificate saved as", fileName);
  } catch (error) {
    console.error("Error generating certificate:", error);
  }
};
