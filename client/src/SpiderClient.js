
import TopBar from './view/TopBar';
import NetworkDisplay from './view/NetworkDisplay';
import SpiderService from './SpiderService';

// main entry point

let spiderService = new SpiderService();
let nav = new TopBar(spiderService);
let networkDisplay = new NetworkDisplay(spiderService);
