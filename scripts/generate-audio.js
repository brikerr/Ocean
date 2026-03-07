#!/usr/bin/env node
// Generate narration audio files via ElevenLabs TTS API.
// Usage: ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=... node scripts/generate-audio.js

var https = require('https');
var fs = require('fs');
var path = require('path');

var API_KEY = process.env.ELEVENLABS_API_KEY;
var VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

if (!API_KEY || !VOICE_ID) {
  console.error('Error: Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID environment variables.');
  process.exit(1);
}

var OUTPUT_DIR = path.join(__dirname, '..', 'audio');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

var chapters = [
  {
    id: '01-overview',
    text: "You're looking at a vertical cross-section of the entire ocean, from the sun-drenched surface all the way down to the deepest trenches on Earth. It's divided into five pelagic zones, each shaped by three forces that change relentlessly with depth: light, temperature, and pressure. Sunlight vanishes within the first few hundred meters. Below that, temperature plummets through the thermocline, and pressure builds at a crushing rate — one additional atmosphere for every ten meters you descend. That gentle drift of particles you see falling through the column? That's marine snow — a constant rain of dead organisms, fecal matter, and organic debris sinking from the surface. It's the biological pump, and it's the primary food source for almost everything that lives in the deep ocean."
  },
  {
    id: '02-zones',
    text: "Let's descend through the zones. The epipelagic, or sunlight zone, extends from the surface to about two hundred meters. Recreational scuba divers can only reach around forty meters — barely scratching the surface. Yet this thin layer is where phytoplankton produce half of all the oxygen you breathe. Below two hundred meters, you enter the mesopelagic — the twilight zone. This is where sperm whales dive to hunt giant squid, plunging to depths of over two thousand meters on a single breath. Bioluminescence dominates here, with over ninety percent of organisms producing their own light. At one thousand meters, total darkness begins. The bathypelagic is the midnight zone, where the Titanic rests at three thousand eight hundred meters. It was discovered in nineteen eighty-five by the submersible Alvin — a vessel that has made over five thousand dives and is still operating today. Deeper still, in the abyssopelagic zone, the pressure exceeds four hundred atmospheres. In twenty twenty-two, scientists filmed the deepest fish ever recorded — a snailfish gliding calmly at eight thousand three hundred and thirty-six meters in the Izu-Ogasawara Trench. And at the very bottom, the hadal zone: ocean trenches reaching nearly eleven thousand meters. In nineteen sixty, Jacques Piccard and Don Walsh descended to the bottom of the Mariana Trench aboard the bathyscaphe Trieste. They spent twenty minutes on the seafloor and reported seeing a flatfish — life, at the deepest point on Earth."
  },
  {
    id: '03-sound',
    text: "Now let's explore something invisible but remarkable — the SOFAR channel. Sound travels through water at variable speeds, and two competing forces create a strange phenomenon. Near the surface, warm water conducts sound quickly — around fifteen hundred and twenty meters per second. As you descend, the water gets colder and sound slows down. But below about a thousand meters, temperature stabilizes and pressure takes over, compressing the water so densely that sound speeds back up. That minimum speed layer, at roughly a thousand meters depth, is the SOFAR channel — the Sound Fixing and Ranging channel. It acts like a fiber optic cable for sound. Waves that try to escape upward hit faster water and bend back down. Waves that angle downward hit faster water and bend back up. Sound gets trapped and refocused, traveling enormous distances with very little energy loss. The military discovered this during World War Two, when researchers found that small explosions detonated at the right depth could be detected by hydrophones thousands of kilometers away — across entire ocean basins. It became the basis for a downed-pilot rescue system. Today, this is the layer that carries whale songs across the Atlantic and Pacific — blue whale calls traveling over three thousand kilometers through this natural waveguide."
  },
  {
    id: '04-migration',
    text: "Every single day, as the sun sets, the largest animal migration on Earth begins — and it happens right here in this column. Billions of organisms — lanternfish, krill, jellyfish, squid — rise from the mesopelagic twilight zone toward the surface to feed under the cover of darkness. At dawn, they descend again, retreating from predators and sunlight. This is diel vertical migration, and it moves more biomass than any other event on the planet. Watch the organisms in the visualization cycle between their daytime depths around six hundred meters and their nighttime position near the surface. This migration isn't just a spectacle — it's a critical part of the carbon cycle. These animals feed on plankton at the surface, then carry that carbon deep into the ocean when they descend, effectively pumping carbon dioxide out of the atmosphere. Scientists estimate that without this daily migration, atmospheric CO2 levels would be significantly higher than they are today."
  },
  {
    id: '05-modes',
    text: "The ocean isn't uniform — conditions vary dramatically depending on where you are on the globe. Tropical waters are warm and strongly stratified, with a sharp thermocline creating a hard boundary between the sun-heated surface and the frigid deep. Switch to polar mode, and the picture transforms — near-freezing temperatures from top to bottom, weak stratification, but exceptionally high dissolved oxygen that supports explosive seasonal blooms. Upwelling zones are where the deep ocean fights back. Cold, nutrient-rich water rises to the surface along certain coastlines, creating the most productive fisheries on Earth. They cover less than one percent of the ocean's area, yet support over half of the world's fish catch. And then there are hydrothermal vent fields — ecosystems that rewrite the rules of biology entirely. Powered by chemical energy from Earth's interior, these communities of tube worms, blind shrimp, and heat-tolerant microbes thrive in total darkness, completely independent of sunlight. Life, it turns out, doesn't need a star. It just needs chemistry."
  }
];

function generateChapter(index) {
  if (index >= chapters.length) {
    console.log('\nAll chapters generated successfully.');
    return;
  }

  var chapter = chapters[index];
  var outFile = path.join(OUTPUT_DIR, chapter.id + '.mp3');
  console.log('Generating ' + chapter.id + '...');

  var postData = JSON.stringify({
    text: chapter.text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.3,
      use_speaker_boost: true
    }
  });

  var options = {
    hostname: 'api.elevenlabs.io',
    port: 443,
    path: '/v1/text-to-speech/' + VOICE_ID,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': API_KEY,
      'Accept': 'audio/mpeg'
    }
  };

  var req = https.request(options, function(res) {
    if (res.statusCode !== 200) {
      var body = '';
      res.on('data', function(d) { body += d; });
      res.on('end', function() {
        console.error('  Error ' + res.statusCode + ' for ' + chapter.id + ': ' + body);
        generateChapter(index + 1);
      });
      return;
    }

    var file = fs.createWriteStream(outFile);
    res.pipe(file);
    file.on('finish', function() {
      file.close();
      var size = fs.statSync(outFile).size;
      console.log('  Saved ' + outFile + ' (' + Math.round(size / 1024) + ' KB)');
      setTimeout(function() { generateChapter(index + 1); }, 1000);
    });
  });

  req.on('error', function(e) {
    console.error('  Request error for ' + chapter.id + ': ' + e.message);
    generateChapter(index + 1);
  });

  req.write(postData);
  req.end();
}

console.log('ElevenLabs TTS Audio Generator — Ocean Depths');
console.log('Voice ID: ' + VOICE_ID);
console.log('Output: ' + OUTPUT_DIR);
console.log('---');
generateChapter(0);
