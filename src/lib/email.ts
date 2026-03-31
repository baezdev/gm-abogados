export const handleSendEmail = async (
  name: string,
  phone: string,
  problem: string,
  message: string
): Promise<boolean> => {
  try {
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, problem, message }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Error en la respuesta del servidor");
    }

    return true;
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return false;
  }
};
