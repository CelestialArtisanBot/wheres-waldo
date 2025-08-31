export default {
  async fetch(request, env) {
    try {
      const themeOptions = ["crowded market", "ancient ruins", "wild west town", "medieval castle", "busy beach"];
      const randomTheme = themeOptions[Math.floor(Math.random() * themeOptions.length)];

      const inputs = {
        prompt: `A detailed illustration of a crowded ${randomTheme} scene with hundreds of people. There is only one Waldo (Wally) in the scene, wearing a distinctive red and white horizontally striped shirt, a red and white bobble hat, and black glasses with round lenses. Include many distracting objects, characters, and activities to make finding Waldo challenging.`,
      };

      const response = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs,
      );

      return new Response(response, {
        headers: {
          "content-type": "image/png",
        },
      });
    } catch (error) {
      console.error("Error generating image:", error);
      return new Response("Error generating image", {
        status: 500,
      });
    }
  },
} satisfies ExportedHandler<Env>;
