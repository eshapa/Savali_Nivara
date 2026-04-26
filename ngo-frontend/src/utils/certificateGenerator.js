import { jsPDF } from "jspdf";

const getBase64ImageFromURL = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = error => reject(error);
    img.src = url;
  });
};

export const generateCertificate = async (donation) => {
  console.log("Generating premium certificate for:", donation);
  
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

    // 1. Load the NGO Logo
    let logoBase64 = null;
    try {
      logoBase64 = await getBase64ImageFromURL('/logo.png');
    } catch (err) {
      console.error("Could not load logo for certificate", err);
    }

    // 2. Premium Background and Borders
    doc.setFillColor(252, 251, 246); // Cream background
    doc.rect(0, 0, 297, 210, "F");

    // Outer thick border
    doc.setDrawColor(31, 111, 93); // Theme Emerald
    doc.setLineWidth(4);
    doc.rect(10, 10, 277, 190);
    
    // Inner thin gold border
    doc.setDrawColor(212, 175, 55); // Gold
    doc.setLineWidth(0.8);
    doc.rect(14, 14, 269, 182);
    
    // Corner ornaments (simple classy lines)
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(1.5);
    // Top Left
    doc.line(20, 20, 40, 20);
    doc.line(20, 20, 20, 40);
    // Top Right
    doc.line(277, 20, 257, 20);
    doc.line(277, 20, 277, 40);
    // Bottom Left
    doc.line(20, 190, 40, 190);
    doc.line(20, 190, 20, 170);
    // Bottom Right
    doc.line(277, 190, 257, 190);
    doc.line(277, 190, 277, 170);

    const userName = localStorage.getItem("userName") || "Valued Donor";
    const createdAt = donation.createdAt || new Date();
    const dateStr = new Date(createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // 3. Header Section with Logo
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 133.5, 22, 30, 30);
    }
    
    doc.setTextColor(31, 111, 93);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(32);
    doc.text("SAVALI NIVARA NGO", 148.5, 65, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(212, 175, 55); // Gold
    doc.text("CERTIFICATE OF APPRECIATION", 148.5, 78, { align: "center" });

    // Decorative divider
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(100, 86, 197, 86);

    // 4. Main Text
    doc.setFontSize(16);
    doc.setTextColor(70, 70, 70);
    doc.setFont("helvetica", "italic");
    doc.text("This is proudly presented to", 148.5, 105, { align: "center" });

    // Donor Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(31, 111, 93);
    doc.text(userName, 148.5, 125, { align: "center" });

    // Appreciation Message
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    
    const type = donation.type || "generous";
    const typeText = type === 'money' ? 'Monetary Support' : `${type.toUpperCase()} Donation`;
    const amtText = donation.details?.amount ? ` of INR ${donation.details.amount}` : '';
    
    doc.text(`In profound appreciation of your generous ${typeText}${amtText},`, 148.5, 145, { align: "center" });
    doc.text(`which serves as a beacon of hope, enabling us to provide care,`, 148.5, 155, { align: "center" });
    doc.text(`shelter, and a dignified life to the residents of our centers.`, 148.5, 165, { align: "center" });

    // 5. Footer Details
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "bold");
    
    // Left footer - Details
    doc.text("ISSUANCE DETAILS", 30, 175);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${dateStr}`, 30, 183);
    const donationId = donation._id || "NEW-DONATION";
    doc.text(`Ref ID: ${donationId.toString().substring(0, 8).toUpperCase()}`, 30, 191);

    // Right footer - Logo instead of signature
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 235, 160, 25, 25);
    }
    doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 111, 93);
    doc.text("Savali Nivara Trust", 247.5, 191, { align: "center" });

    // Save the PDF
    const fileName = `Savali_Nivara_Certificate_${donationId.toString().substring(0, 6)}.pdf`;
    doc.save(fileName);
    console.log("Premium Certificate saved as", fileName);
  } catch (error) {
    console.error("Error generating certificate:", error);
  }
};
