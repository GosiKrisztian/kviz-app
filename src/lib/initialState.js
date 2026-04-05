export const initialQuizState = {
  title: "",
  description: "",
  rounds: [
    {
      id: 1,
      title: "1. kör",
      questions: [
        {
          id: 1,
          type: "single", // single, multiple, image, audio
          questionText: "",
          options: [
            { id: 1, text: "", isCorrect: false }
          ],
          timer: 30, // másodpercben
          mediaUrl: "" // kép vagy audió linkje
        }
      ]
    }
  ]
};
