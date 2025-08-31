export default {
  async fetch(request, env) {
    try {
      const themeOptions = ["crowded market", "ancient ruins", "wild west town", "medieval castle", "busy beach"];
      const randomTheme = themeOptions[Math.floor(Math.random() * themeOptions.length)];

      const inputs = {
        prompt: `A high-resolution, detailed illustration of a crowded ${randomTheme} scene, featuring many people, objects, and activities. Waldo (Wally) is hiding somewhere in the scene, wearing his signature red and white striped shirt, bobble hat, and glasses. The scene is vibrant and colorful, with plenty of distractions to make finding Waldo challenging.`,
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
