import * as express from 'express';
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());
server.use(express.json());

const router = express.Router();

router.post('/mood', (req, res) => {
  const text = req.body.text;
  if (text !== undefined) {
    const analyzer = new ToneAnalyzerV3({
      url: 'https://gateway-lon.watsonplatform.net/tone-analyzer/api',
      version: '2017-09-21',
      iam_apikey: 'IaPe3B1RK_ArRwf02AhZW8azwC4HUbN-Bp7mVvad46Is'
    });
    const toneParameters = {
      tone_input: text,
      content_type: 'text/plain'
    };
    analyzer.tone(toneParameters).then(analysis => {
      res.send(analysis);
    }).catch(err => {
      res.status(500).send(err); //error message e.g supply text
    });
    return;
  }
  res.status(500).send();
});

const publicPath = path.join(__dirname, 'public');
console.log(publicPath);
server.use('/', express.static(publicPath));

server.use(router);
server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});

