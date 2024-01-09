export default [
	{
		Root: import.meta.resolve("./"),
		Components: [
			"./src/molecules/ChatBox.tsx",
			"./src/molecules/ChatInput.tsx",
			"./src/organisms/ChatHistory.tsx",
		],
	},
];