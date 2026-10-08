function saveContact() {
    const firstName = "Eliezer Glenn";
    const lastName = "Castelo";
    const organization = "Your Company";
    const jobTitle = "Information Technology Professional";
    const phone = "+639123456789";
    const email = "your@email.com";
    const location = "Nueva Ecija, Philippines";
    const website = "https://yourwebsite.com";

    const vCard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${organization}
TITLE:${jobTitle}
TEL;TYPE=CELL:${phone}
EMAIL;TYPE=INTERNET:${email}
ADR;TYPE=WORK:;;${location};;;;
URL:${website}
END:VCARD`;

    const blob = new Blob([vCard], {
        type: "text/vcard;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${firstName}_${lastName}.vcf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

async function shareCard() {
    const shareData = {
        title: "Eliezer Glenn Castelo - Digital Card",
        text: "Connect with Eliezer Glenn Castelo",
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.log("Share cancelled.");
        }

        return;
    }

    try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Digital card link copied!");
    } catch (error) {
        prompt("Copy this link:", window.location.href);
    }
}