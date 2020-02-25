import '../../default-theme-b163939d.js';
import { L as LitElement, h as html, u as connect, s as store, c as css } from '../../pwa-helpers-8a70a2bd.js';
import { c as createWallet, b as doLogin, e as doSelectAddress, f as doLogout } from '../../typography-6e4ff6d4.js';
import { P as Polymer, d as dom } from '../../iron-a11y-keys-behavior-e282ce25.js';
import '../../mwc-icon-3f009878.js';
import { s as snackbar, r as ripple } from '../../loading-ripple-0f6bea17.js';
import { g as doStoreWallet } from '../../iron-a11y-announcer-b3f922bb.js';
import '../../mwc-icon-button-ad5b3b79.js';

/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/

/**
`<iron-label>` provides a version of the `<label>` element that works with
Custom Elements as well as native elements.

All text in the `iron-label` will be applied to the target element as a
screen-reader accessible description.

There are three ways to use `iron-label` to target an element:

1. place an element inside iron-label and some text:

        <iron-label>
          Label for the Button
          <paper-button>button</paper-button>
        </iron-label>

2. place some elements inside iron-label and target one with the
`iron-label-target` attribute. The other elements will provide the label for
that element Note: This is not necessary if the element you want to label is the
first element child of iron-label:

        <iron-label>
          <span>Label for the Button</span>
          <paper-button iron-label-target>button</paper-button>
        </iron-label>

        <iron-label>
          <paper-button>button</paper-button>
          <span>Label for the Button</span>
        </iron-label>

3. Set the `for` attribute on the `iron-label` element with the id of the target
element in the same document or ShadowRoot:

        <iron-label for="foo">
          Context for the button with the "foo" class"
        </iron-label>
        <paper-button id="foo">Far away button</paper-button>

All taps on the `iron-label` will be forwarded to the "target" element.

@group Iron Elements
@element iron-label
@demo demo/index.html
@homepage polymer.github.io
*/
const IronLabel = Polymer({
  is: 'iron-label',

  listeners: {'tap': '_tapHandler'},

  properties: {
    /**
     * An ID reference to another element that needs to be
     * labelled by this `iron-label` element.
     */
    for: {
      type: String,
      value: '',
      reflectToAttribute: true,
      observer: '_forChanged'
    },
    /**
     * @type {Element}
     */
    _forElement: Object
  },

  attached: function() {
    this._forChanged();
  },

  ready: function() {
    this._generateLabelId();
  },

  // generate a unique id for this element
  _generateLabelId: function() {
    if (!this.id) {
      var id = 'iron-label-' + IronLabel._labelNumber++;
      dom(this).setAttribute('id', id);
    }
  },

  _findTarget: function() {
    if (this.for) {
      // external target
      var scope = dom(this).getOwnerRoot();
      return dom(scope).querySelector('#' + this.for);
    } else {
      // explicit internal target
      var el = dom(this).querySelector('[iron-label-target]');
      if (!el) {
        // implicit internal target
        el = dom(this).firstElementChild;
      }
      return el;
    }
  },

  _tapHandler: function(ev) {
    if (!this._forElement) {
      return;
    }
    var target = dom(ev).localTarget;
    if (target === this._forElement) {
      return;
    }
    this._forElement.focus();
    this._forElement.click();
  },

  _applyLabelledBy: function() {
    if (this._forElement) {
      dom(this._forElement).setAttribute('aria-labelledby', this.id);
    }
  },

  _forChanged: function() {
    if (this._forElement) {
      dom(this._forElement).removeAttribute('aria-labelledby');
    }
    this._forElement = this._findTarget();
    this._applyLabelledBy();
  }
});

// global counter for unique label ids
IronLabel._labelNumber = 0;

// Sourced from https://gist.github.com/letsgetrandy/1e05a68ea74ba6736eb5

const EXCEPTIONS = {
    'are': 'were',
    'eat': 'ate',
    'go': 'went',
    'have': 'had',
    'inherit': 'inherited',
    'is': 'was',
    'run': 'ran',
    'sit': 'sat',
    'visit': 'visited'
};

const getPastTense = (verb, exceptions = EXCEPTIONS) => {
    if (exceptions[verb]) {
        return exceptions[verb]
    }
    if ((/e$/i).test(verb)) {
        return verb + 'd'
    }
    if ((/[aeiou]c$/i).test(verb)) {
        return verb + 'ked'
    }
    // for american english only
    if ((/el$/i).test(verb)) {
        return verb + 'ed'
    }
    if ((/[aeio][aeiou][dlmnprst]$/).test(verb)) {
        return verb + 'ed'
    }
    if ((/[aeiou][bdglmnprst]$/i).test(verb)) {
        return verb.replace(/(.+[aeiou])([bdglmnprst])/, '$1$2$2ed')
    }
    return verb + 'ed'
};

const verbs = [
    'abase', 'abate', 'abduct', 'abet', 'abhor', 'abide', 'abjure', 'ablate', 'abort', 'abound', 'abseil', 'absorb', 'abuse', 'abut', 'accede', 'accent', 'accept', 'access', 'accord', 'accost', 'accrue', 'accuse', 'ache', 'acquit', 'act', 'adapt', 'add', 'addict', 'addle', 'adduce', 'adhere', 'adjoin', 'adjust', 'admire', 'admit', 'adopt', 'adore', 'adorn', 'advert', 'advise', 'aerate', 'affect', 'affirm', 'affix', 'afford', 'age', 'agree', 'aid', 'aim', 'alarm', 'alert', 'alight', 'align', 'allay', 'allege', 'allot', 'allow', 'alloy', 'allure', 'ally', 'alter', 'amass', 'amaze', 'amble', 'ambush', 'amend', 'amount', 'amuse', 'anger', 'angle', 'anneal', 'annex', 'annoy', 'annul', 'anoint', 'answer', 'ape', 'appeal', 'appear', 'append', 'apply', 'arc', 'arch', 'argue', 'arise', 'arm', 'array', 'arrest', 'arrive', 'arrow', 'ascend', 'ask', 'aspire', 'assail', 'assay', 'assent', 'assert', 'assess', 'assign', 'assist', 'assort', 'assume', 'assure', 'atone', 'attach', 'attack', 'attain', 'attend', 'attest', 'attire', 'attune', 'audit', 'augur', 'author', 'avail', 'avenge', 'aver', 'avert', 'avoid', 'await', 'awake', 'awaken', 'award', 'awe', 'babble', 'back', 'badge', 'badger', 'baffle', 'bag', 'bail', 'bait', 'bake', 'bald', 'bale', 'ball', 'ballot', 'ban', 'band', 'bandy', 'bang', 'banish', 'bank', 'banter', 'bar', 'barb', 'barber', 'bard', 'bare', 'barge', 'bark', 'barn', 'barrel', 'barter', 'base', 'bash', 'bask', 'baste', 'bat', 'batch', 'bathe', 'batten', 'batter', 'battle', 'bawl', 'bay', 'be', 'beach', 'beacon', 'bead', 'beam', 'bean', 'bear', 'beard', 'beat', 'become', 'bed', 'beef', 'beep', 'beetle', 'befall', 'befit', 'beg', 'beget', 'beggar', 'begin', 'behave', 'behead', 'behold', 'belay', 'belch', 'belie', 'bell', 'bellow', 'belly', 'belong', 'belt', 'bemoan', 'bench', 'bend', 'berate', 'berry', 'beset', 'best', 'bestir', 'bestow', 'bet', 'betide', 'betray', 'better', 'bevel', 'bewail', 'beware', 'bias', 'bib', 'bicker', 'bid', 'bide', 'bilge', 'bill', 'billet', 'billow', 'bin', 'bind', 'birdie', 'birth', 'bisect', 'bit', 'bite', 'bitter', 'black', 'blame', 'blanch', 'blank', 'blare', 'blast', 'blaze', 'bleach', 'bleat', 'bleed', 'bleep', 'blench', 'blend', 'bless', 'blight', 'blind', 'blink', 'blip', 'bliss', 'blitz', 'bloat', 'blob', 'blood', 'bloody', 'bloom', 'blot', 'blotch', 'blow', 'blue', 'bluff', 'blunt', 'blur', 'blurb', 'blurt', 'blush', 'board', 'boast', 'bob', 'bode', 'body', 'bog', 'bogey', 'boggle', 'boil', 'bolt', 'bomb', 'bond', 'bone', 'bonnet', 'boo', 'book', 'boom', 'boost', 'boot', 'booze', 'bop', 'bore', 'borrow', 'boss', 'botch', 'bother', 'bottle', 'bottom', 'bounce', 'bound', 'bout', 'bow', 'bowel', 'bowl', 'box', 'brace', 'brag', 'braid', 'braise', 'brake', 'branch', 'brand', 'brave', 'brawl', 'bray', 'breach', 'bread', 'break', 'breed', 'breeze', 'brew', 'bribe', 'brick', 'bridge', 'bridle', 'brief', 'brim', 'brine', 'bring', 'broach', 'broil', 'bronze', 'brook', 'brown', 'browse', 'bruise', 'brush', 'bubble', 'buck', 'bucket', 'buckle', 'bud', 'budge', 'budget', 'buffet', 'bug', 'bugle', 'build', 'bulge', 'bulk', 'bull', 'bully', 'bumble', 'bump', 'bunch', 'bundle', 'bung', 'bungle', 'bunk', 'bunker', 'buoy', 'burble', 'burden', 'burgle', 'burn', 'burp', 'burr', 'burrow', 'burst', 'bury', 'bus', 'bush', 'busk', 'bust', 'bustle', 'busy', 'butt', 'button', 'buy', 'buzz', 'bypass', 'cab', 'cabal', 'cabin', 'cable', 'cache', 'cackle', 'cadge', 'cage', 'cajole', 'cake', 'call', 'calm', 'calve', 'camber', 'camp', 'can', 'canal', 'cancel', 'candle', 'candy', 'cane', 'cannon', 'canoe', 'canopy', 'cant', 'canter', 'cap', 'caper', 'card', 'care', 'career', 'caress', 'carol', 'carp', 'carpet', 'carry', 'cart', 'carve', 'case', 'cash', 'cast', 'castle', 'cat', 'catch', 'cater', 'caucus', 'cause', 'cave', 'cavern', 'cease', 'cede', 'cellar', 'cement', 'censor', 'chafe', 'chain', 'chair', 'chalk', 'champ', 'chance', 'change', 'chant', 'chap', 'char', 'charge', 'charm', 'chart', 'chase', 'chat', 'cheat', 'check', 'cheep', 'cheer', 'chew', 'chide', 'chill', 'chime', 'chin', 'chink', 'chip', 'chirp', 'chisel', 'chock', 'choir', 'choke', 'choose', 'chop', 'chord', 'chorus', 'chrome', 'chuck', 'chuff', 'chug', 'chum', 'chunk', 'churn', 'chute', 'cinder', 'cipher', 'circle', 'cite', 'clad', 'claim', 'clam', 'clamp', 'clang', 'clank', 'clap', 'clash', 'clasp', 'class', 'claw', 'clean', 'clear', 'cleat', 'cleave', 'clench', 'clerk', 'click', 'climax', 'climb', 'clinch', 'cling', 'clink', 'clip', 'clique', 'cloak', 'clock', 'clog', 'clone', 'close', 'closet', 'clot', 'cloud', 'clout', 'clown', 'club', 'cluck', 'clue', 'clump', 'clutch', 'coach', 'coal', 'coast', 'coat', 'coax', 'cobble', 'cobweb', 'cockle', 'cocoon', 'coddle', 'code', 'codify', 'coerce', 'coffer', 'coffin', 'cog', 'cohere', 'coil', 'coin', 'coke', 'collar', 'comb', 'combat', 'come', 'commit', 'compel', 'comply', 'con', 'concur', 'cone', 'confer', 'convey', 'convoy', 'cook', 'cool', 'cope', 'copper', 'copy', 'cord', 'cordon', 'core', 'cork', 'corn', 'corner', 'corral', 'cosset', 'cost', 'cotton', 'couch', 'cough', 'count', 'couple', 'course', 'court', 'cover', 'covet', 'cowl', 'cox', 'crab', 'crack', 'cradle', 'craft', 'cram', 'cramp', 'crane', 'crank', 'crash', 'crate', 'crater', 'crave', 'crawl', 'crayon', 'craze', 'creak', 'cream', 'crease', 'create', 'credit', 'creed', 'creep', 'crest', 'crew', 'crib', 'crick', 'crimp', 'cringe', 'crisp', 'croak', 'crook', 'croon', 'crop', 'cross', 'crouch', 'crowd', 'crown', 'cruise', 'crunch', 'crush', 'crust', 'crutch', 'cry', 'cube', 'cuckoo', 'cuddle', 'cudgel', 'cue', 'cuff', 'cull', 'cup', 'curb', 'curd', 'curdle', 'cure', 'curl', 'curry', 'curse', 'curve', 'cuss', 'cut', 'cycle', 'dab', 'dabble', 'dagger', 'dally', 'dam', 'damage', 'damn', 'damp', 'dampen', 'dance', 'dangle', 'dapple', 'dare', 'darken', 'darn', 'dart', 'dash', 'date', 'daub', 'daunt', 'dawdle', 'daze', 'dazzle', 'deaden', 'deafen', 'deal', 'debar', 'debase', 'debate', 'debit', 'debug', 'debut', 'decamp', 'decant', 'decay', 'decide', 'deck', 'decode', 'decoy', 'decree', 'decry', 'deduce', 'deduct', 'deem', 'deepen', 'deface', 'defame', 'defeat', 'defect', 'defend', 'defer', 'defile', 'define', 'deform', 'defray', 'defuse', 'defy', 'deify', 'deign', 'delay', 'delete', 'delude', 'deluge', 'delve', 'demand', 'demean', 'demise', 'demote', 'demur', 'den', 'denote', 'dent', 'denude', 'deny', 'depart', 'depend', 'depict', 'deploy', 'deport', 'depose', 'depute', 'derail', 'deride', 'derive', 'desert', 'design', 'desire', 'desist', 'detach', 'detail', 'detain', 'detect', 'deter', 'detest', 'detour', 'devil', 'devise', 'devote', 'devour', 'dial', 'diaper', 'dice', 'die', 'diet', 'differ', 'dig', 'digest', 'dilate', 'dilute', 'dim', 'dimple', 'din', 'dine', 'dint', 'dip', 'direct', 'disarm', 'disc', 'disco', 'dish', 'dismay', 'disown', 'dispel', 'disuse', 'ditch', 'dither', 'dive', 'divert', 'divest', 'divide', 'divine', 'dizzy', 'do', 'dock', 'docket', 'doctor', 'dodge', 'dog', 'dole', 'doll', 'dolly', 'dome', 'donate', 'doodle', 'doom', 'dope', 'dose', 'dot', 'dote', 'double', 'doubt', 'douse', 'dowel', 'down', 'dowse', 'doze', 'drab', 'draft', 'drag', 'drain', 'drape', 'draw', 'drawl', 'dray', 'dread', 'dream', 'dredge', 'drench', 'dress', 'drift', 'drill', 'drink', 'drip', 'drive', 'drivel', 'drone', 'drool', 'droop', 'drop', 'drown', 'drowse', 'drudge', 'drug', 'drum', 'dry', 'dub', 'duck', 'duel', 'duet', 'dull', 'dumb', 'dummy', 'dump', 'dun', 'dupe', 'dust', 'dwarf', 'dwell', 'dye', 'ear', 'earn', 'ease', 'eat', 'ebb', 'echo', 'eddy', 'edge', 'edify', 'edit', 'efface', 'egg', 'egress', 'eject', 'elapse', 'elate', 'elbow', 'elect', 'elicit', 'elide', 'elope', 'elude', 'embalm', 'embark', 'embed', 'embody', 'emboss', 'emerge', 'emit', 'employ', 'empty', 'enable', 'enact', 'enamel', 'encamp', 'encase', 'encode', 'encore', 'end', 'endear', 'endow', 'endure', 'enfold', 'engage', 'engulf', 'enjoin', 'enjoy', 'enlist', 'enrage', 'enrich', 'ensue', 'ensure', 'entail', 'enter', 'entice', 'entomb', 'entrap', 'envy', 'equal', 'equate', 'equip', 'erase', 'erect', 'erode', 'err', 'erupt', 'escape', 'eschew', 'escort', 'escrow', 'essay', 'esteem', 'etch', 'evade', 'evict', 'evince', 'evoke', 'evolve', 'exact', 'exalt', 'exceed', 'excel', 'except', 'excess', 'excise', 'excite', 'excuse', 'exempt', 'exert', 'exeunt', 'exhale', 'exhort', 'exhume', 'exile', 'exist', 'expand', 'expect', 'expel', 'expend', 'expire', 'export', 'expose', 'extend', 'extol', 'extort', 'exude', 'exult', 'eye', 'fable', 'face', 'facet', 'factor', 'fade', 'fail', 'faint', 'fair', 'fake', 'fall', 'falter', 'fame', 'fan', 'fancy', 'farce', 'fare', 'farm', 'fast', 'fasten', 'fat', 'fate', 'father', 'fathom', 'fatten', 'fault', 'fawn', 'fear', 'feast', 'fee', 'feed', 'feel', 'feign', 'fell', 'fence', 'fend', 'ferret', 'ferry', 'fester', 'fetch', 'fettle', 'feud', 'fever', 'fib', 'fiddle', 'fidget', 'field', 'fife', 'fight', 'figure', 'file', 'fill', 'fillet', 'fillip', 'film', 'filter', 'fin', 'find', 'fine', 'finger', 'finish', 'fire', 'firm', 'fish', 'fit', 'fitter', 'fix', 'fizz', 'fizzle', 'flack', 'flag', 'flail', 'flake', 'flame', 'flank', 'flap', 'flare', 'flash', 'flat', 'flaunt', 'flaw', 'flay', 'flee', 'fleece', 'fleet', 'flesh', 'flex', 'flick', 'flight', 'flinch', 'fling', 'flint', 'flip', 'flit', 'float', 'flock', 'flog', 'flood', 'floor', 'flop', 'floss', 'flour', 'flout', 'flow', 'flower', 'fluff', 'flurry', 'flush', 'flute', 'flux', 'fly', 'foal', 'foam', 'fob', 'focus', 'fodder', 'fog', 'foil', 'foist', 'fold', 'folio', 'follow', 'foment', 'fondle', 'fool', 'foot', 'forage', 'foray', 'forbid', 'force', 'ford', 'forego', 'forest', 'forge', 'forget', 'fork', 'form', 'format', 'foster', 'foul', 'found', 'fowl', 'fox', 'frame', 'frank', 'fray', 'freak', 'free', 'freeze', 'frenzy', 'fresh', 'fret', 'friend', 'fright', 'frill', 'fringe', 'frisk', 'frock', 'frog', 'frolic', 'front', 'frost', 'froth', 'frown', 'fruit', 'fry', 'fudge', 'fuel', 'full', 'fumble', 'fume', 'fun', 'fund', 'funk', 'funnel', 'fur', 'furrow', 'fuse', 'fuss', 'fuzz', 'gabble', 'gad', 'gaff', 'gag', 'gaggle', 'gain', 'gait', 'gall', 'gallop', 'gamble', 'gambol', 'game', 'gang', 'gap', 'gape', 'garage', 'garble', 'garden', 'gargle', 'garner', 'garter', 'gas', 'gash', 'gasp', 'gate', 'gather', 'gauge', 'gavel', 'gaze', 'gear', 'gel', 'gem', 'gender', 'gentle', 'get', 'ghost', 'gibber', 'gibbet', 'giddy', 'gift', 'gig', 'giggle', 'gimlet', 'gin', 'ginger', 'gird', 'girdle', 'girth', 'give', 'glad', 'glance', 'glare', 'glass', 'glaze', 'gleam', 'glean', 'glide', 'glint', 'gloat', 'globe', 'gloom', 'glory', 'gloss', 'glove', 'glow', 'glower', 'glue', 'glut', 'gnarl', 'gnash', 'gnaw', 'go', 'goad', 'gobble', 'golf', 'gong', 'goose', 'gore', 'gorge', 'gossip', 'gouge', 'govern', 'gown', 'grab', 'grace', 'grade', 'graft', 'grain', 'grant', 'graph', 'grasp', 'grass', 'grate', 'grave', 'gravel', 'graze', 'grease', 'green', 'greet', 'grey', 'grieve', 'grill', 'grin', 'grind', 'grip', 'gripe', 'grit', 'groan', 'groin', 'groom', 'groove', 'grope', 'gross', 'grouch', 'ground', 'group', 'grouse', 'grout', 'grovel', 'grow', 'growl', 'grub', 'grudge', 'grunt', 'guard', 'guess', 'guest', 'guffaw', 'guide', 'guilt', 'guise', 'gulf', 'gull', 'gully', 'gulp', 'gum', 'gun', 'gurgle', 'gush', 'gust', 'gut', 'gutter', 'guy', 'guzzle', 'gyrate', 'habit', 'hack', 'haft', 'haggle', 'hail', 'hale', 'hallo', 'halo', 'halt', 'halter', 'halve', 'ham', 'hammer', 'hamper', 'hand', 'handle', 'hang', 'hanker', 'happen', 'harass', 'harden', 'hark', 'harm', 'harp', 'harrow', 'harry', 'hash', 'hasp', 'hassle', 'haste', 'hasten', 'hat', 'hatch', 'hate', 'haul', 'haunt', 'have', 'haven', 'havoc', 'hawk', 'hay', 'hazard', 'haze', 'head', 'heal', 'heap', 'hear', 'heart', 'heat', 'heave', 'heckle', 'hector', 'hedge', 'heed', 'heel', 'heft', 'hell', 'hello', 'helm', 'help', 'hem', 'herald', 'herd', 'hew', 'hex', 'hiccup', 'hide', 'hijack', 'hike', 'hill', 'hilt', 'hinder', 'hinge', 'hint', 'hip', 'hiss', 'hit', 'hitch', 'hive', 'hoard', 'hoax', 'hob', 'hobble', 'hock', 'hoe', 'hog', 'hoist', 'hold', 'hole', 'hollow', 'home', 'hone', 'honey', 'honk', 'hood', 'hoof', 'hook', 'hoop', 'hoot', 'hop', 'hope', 'horde', 'horn', 'hose', 'host', 'hostel', 'hound', 'house', 'hovel', 'hover', 'howl', 'huddle', 'huff', 'hug', 'hulk', 'hull', 'hum', 'humble', 'humbug', 'hump', 'hunch', 'hunger', 'hunt', 'hurdle', 'hurl', 'hurrah', 'hurry', 'hurt', 'hurtle', 'hush', 'husk', 'hustle', 'hymn', 'hyphen', 'ice', 'id', 'idle', 'ignite', 'ignore', 'image', 'imbibe', 'imbue', 'imp', 'impact', 'impair', 'impale', 'impart', 'impede', 'impel', 'imply', 'import', 'impose', 'impugn', 'impute', 'inch', 'incite', 'incur', 'indent', 'index', 'indict', 'induce', 'induct', 'infect', 'infer', 'infest', 'infix', 'inform', 'infuse', 'ingest', 'inhale', 'inject', 'injure', 'ink', 'inlay', 'inlet', 'input', 'insert', 'inset', 'insist', 'insult', 'insure', 'intend', 'inter', 'intern', 'intone', 'inure', 'invade', 'invent', 'invert', 'invest', 'invite', 'invoke', 'ionize', 'iris', 'iron', 'island', 'isle', 'issue', 'itch', 'item', 'jab', 'jabber', 'jack', 'jade', 'jag', 'jail', 'jam', 'jangle', 'jape', 'jar', 'jargon', 'jaunt', 'jaw', 'jazz', 'jeer', 'jelly', 'jerk', 'jest', 'jet', 'jetty', 'jewel', 'jib', 'jibe', 'jig', 'jigsaw', 'jilt', 'jingle', 'jinx', 'jitter', 'jive', 'job', 'jockey', 'jog', 'join', 'joint', 'joke', 'jolly', 'jolt', 'jostle', 'jot', 'joust', 'joy', 'judge', 'jug', 'juggle', 'juice', 'jumble', 'jump', 'junk', 'junket', 'just', 'jut', 'kayak', 'keel', 'keen', 'keep', 'ken', 'kennel', 'kernel', 'key', 'kick', 'kid', 'kidnap', 'kill', 'kiln', 'kilt', 'kindle', 'king', 'kink', 'kipper', 'kiss', 'kit', 'kite', 'kitten', 'knead', 'knee', 'kneel', 'knell', 'knife', 'knight', 'knit', 'knock', 'knoll', 'knot', 'know', 'kosher', 'kowtow', 'laager', 'label', 'lace', 'lack', 'lackey', 'ladle', 'lag', 'lame', 'lament', 'lance', 'land', 'lap', 'lapse', 'lard', 'lark', 'lash', 'lasso', 'last', 'latch', 'lathe', 'lather', 'laud', 'laugh', 'launch', 'laurel', 'lavish', 'law', 'lay', 'layer', 'laze', 'lazy', 'leach', 'lead', 'leaf', 'league', 'leak', 'lean', 'leap', 'learn', 'lease', 'leash', 'leave', 'leaven', 'lecher', 'leech', 'leer', 'leg', 'lend', 'lesion', 'lessen', 'lesson', 'let', 'letter', 'level', 'lever', 'levy', 'libel', 'lichen', 'lick', 'lid', 'lie', 'lift', 'light', 'like', 'liken', 'lilt', 'limb', 'limber', 'lime', 'limit', 'limp', 'line', 'linger', 'link', 'lip', 'liquor', 'lisp', 'list', 'listen', 'litter', 'live', 'liven', 'load', 'loaf', 'loam', 'loan', 'loathe', 'lob', 'lobby', 'local', 'locate', 'lock', 'lodge', 'loft', 'log', 'loiter', 'loll', 'long', 'look', 'loom', 'loop', 'loose', 'loosen', 'loot', 'lop', 'lope', 'lord', 'lose', 'lot', 'loth', 'lounge', 'louse', 'lout', 'love', 'lower', 'luck', 'lug', 'lull', 'lumber', 'lump', 'lunch', 'lunge', 'lurch', 'lure', 'lurk', 'lust', 'lute', 'lynch', 'mace', 'mad', 'madden', 'mail', 'maim', 'major', 'make', 'malign', 'malt', 'man', 'manage', 'mangle', 'mantle', 'manure', 'map', 'mar', 'marble', 'march', 'margin', 'mark', 'market', 'marl', 'maroon', 'marry', 'martyr', 'marvel', 'mash', 'mask', 'mason', 'mass', 'mast', 'master', 'mat', 'match', 'mate', 'matte', 'matter', 'mature', 'maul', 'maze', 'mean', 'medal', 'meddle', 'meet', 'meld', 'mellow', 'melt', 'menace', 'mend', 'mentor', 'merge', 'merit', 'mesh', 'mess', 'metal', 'meter', 'mew', 'mildew', 'milk', 'mill', 'mimic', 'mince', 'mind', 'mine', 'mingle', 'minor', 'mint', 'minute', 'mire', 'mirror', 'miscue', 'misfit', 'mislay', 'miss', 'mist', 'misuse', 'mitre', 'mix', 'moan', 'mob', 'mock', 'model', 'modem', 'modify', 'molest', 'molten', 'monger', 'monkey', 'moon', 'moor', 'moot', 'mop', 'mope', 'morph', 'morsel', 'mortar', 'mosaic', 'moss', 'mother', 'motion', 'motive', 'motor', 'mould', 'mound', 'mount', 'mourn', 'mouse', 'mousse', 'mouth', 'move', 'mow', 'muck', 'mud', 'muddle', 'muddy', 'muff', 'muffle', 'mug', 'mulch', 'mull', 'mumble', 'mummy', 'munch', 'murder', 'murmur', 'muscle', 'muse', 'mush', 'must', 'muster', 'mutate', 'mute', 'mutiny', 'mutter', 'muzzle', 'nag', 'nail', 'name', 'nap', 'narrow', 'near', 'neaten', 'neck', 'need', 'needle', 'negate', 'neigh', 'nerve', 'nest', 'nestle', 'net', 'nettle', 'neuter', 'nibble', 'niche', 'nick', 'nickel', 'niggle', 'nigh', 'nip', 'nod', 'noise', 'noodle', 'noose', 'nose', 'notch', 'note', 'notice', 'notify', 'nudge', 'null', 'numb', 'number', 'nurse', 'nut', 'nuzzle', 'oar', 'obey', 'object', 'oblige', 'obtain', 'occult', 'occupy', 'occur', 'off', 'offend', 'offer', 'ogle', 'oh', 'oil', 'omen', 'omit', 'ooze', 'open', 'opiate', 'oppose', 'opt', 'option', 'orb', 'orbit', 'ordain', 'order', 'orient', 'orphan', 'oust', 'out', 'outbid', 'outdo', 'outfit', 'outlaw', 'outlay', 'output', 'outrun', 'outwit', 'over', 'overdo', 'owe', 'own', 'oyster', 'pace', 'pacify', 'pack', 'packet', 'pad', 'paddle', 'page', 'pain', 'paint', 'pair', 'pal', 'pale', 'pall', 'pallet', 'palm', 'palsy', 'pamper', 'pan', 'pander', 'panel', 'panic', 'pant', 'paper', 'par', 'parade', 'parcel', 'parch', 'pardon', 'pare', 'parent', 'park', 'parley', 'parody', 'parole', 'parrot', 'parry', 'parse', 'part', 'party', 'pass', 'paste', 'pastor', 'pat', 'patch', 'patent', 'patrol', 'patter', 'pause', 'pave', 'paw', 'pawn', 'pay', 'peace', 'peach', 'peak', 'peal', 'pearl', 'pebble', 'peck', 'pedal', 'peddle', 'peek', 'peel', 'peep', 'peer', 'peg', 'pellet', 'pelt', 'pen', 'pencil', 'people', 'pepper', 'perch', 'peril', 'perish', 'perk', 'perm', 'permit', 'peruse', 'pester', 'pestle', 'pet', 'phase', 'phone', 'phrase', 'pi', 'pick', 'picket', 'pickle', 'picnic', 'pie', 'piece', 'pierce', 'piffle', 'pig', 'pike', 'pile', 'pilfer', 'pill', 'pillar', 'pillow', 'pilot', 'pimp', 'pin', 'pinch', 'pine', 'ping', 'pinion', 'pink', 'pip', 'pipe', 'pique', 'pirate', 'pistol', 'pit', 'pitch', 'pith', 'pity', 'pivot', 'place', 'plague', 'plait', 'plan', 'plane', 'plank', 'plant', 'plat', 'plate', 'play', 'plead', 'please', 'pleat', 'pledge', 'plight', 'plod', 'plop', 'plot', 'plough', 'pluck', 'plug', 'plumb', 'plume', 'plump', 'plunge', 'ply', 'poach', 'pocket', 'pod', 'point', 'poise', 'poison', 'poke', 'pole', 'police', 'polish', 'polka', 'poll', 'pollen', 'pomade', 'pond', 'ponder', 'pony', 'pool', 'pop', 'pore', 'port', 'pose', 'posit', 'post', 'pot', 'potter', 'pouch', 'pounce', 'pound', 'pour', 'pout', 'powder', 'power', 'praise', 'prance', 'prank', 'prawn', 'pray', 'preach', 'preen', 'prefab', 'prefix', 'preset', 'press', 'pretty', 'prey', 'price', 'prick', 'pride', 'priest', 'prim', 'prime', 'print', 'prize', 'probe', 'prod', 'profit', 'prompt', 'prong', 'proof', 'prop', 'propel', 'prose', 'prove', 'prowl', 'prune', 'pry', 'pucker', 'puddle', 'puff', 'pug', 'puke', 'pull', 'pulp', 'pulse', 'pumice', 'pummel', 'pump', 'pun', 'punch', 'punish', 'punt', 'pup', 'purge', 'purify', 'purl', 'purple', 'purr', 'purse', 'pursue', 'push', 'put', 'putt', 'putter', 'putty', 'puzzle', 'quack', 'quaff', 'quake', 'quarry', 'quash', 'quaver', 'queen', 'queer', 'quell', 'quench', 'query', 'quest', 'queue', 'quiet', 'quill', 'quilt', 'quip', 'quit', 'quiver', 'quiz', 'quote', 'rabble', 'race', 'rack', 'racket', 'radio', 'raffle', 'raft', 'rag', 'rage', 'raid', 'rail', 'rain', 'raise', 'rake', 'rally', 'ram', 'ramble', 'ramify', 'ramp', 'ramrod', 'ranch', 'range', 'rank', 'rankle', 'ransom', 'rant', 'rap', 'rasp', 'rat', 'rate', 'ratify', 'ration', 'rattle', 'ravage', 'rave', 'ravel', 'raven', 'ravish', 'ray', 'raze', 'reach', 'react', 'read', 'ready', 'really', 'ream', 'reap', 'rear', 'reason', 'rebate', 'rebel', 'rebind', 'rebook', 'rebuff', 'rebuke', 'rebut', 'recall', 'recant', 'recap', 'recast', 'recede', 'recess', 'recite', 'reckon', 'recode', 'recoil', 'record', 'recur', 'redden', 'redeem', 'redial', 'redo', 'redraw', 'reduce', 'reed', 'reef', 'reek', 'reel', 'reeve', 'refer', 'refile', 'refill', 'refine', 'refit', 'reflex', 'reform', 'refuel', 'refuge', 'refund', 'refuse', 'refute', 'regain', 'regale', 'regard', 'regret', 'rehash', 'reheat', 'reify', 'reign', 'reject', 'rejoin', 'relate', 'relax', 'relay', 'relent', 'relink', 'relish', 'relive', 'rely', 'remain', 'remake', 'remand', 'remap', 'remark', 'remedy', 'remind', 'remit', 'remove', 'rename', 'rend', 'render', 'renege', 'renew', 'rent', 'reopen', 'repack', 'repair', 'repast', 'repay', 'repeal', 'repeat', 'repel', 'repent', 'repine', 'replay', 'reply', 'report', 'repose', 'repute', 'reread', 'rerun', 'rescue', 'resell', 'resend', 'resent', 'reset', 'reshow', 'reside', 'resign', 'resin', 'resist', 'resit', 'resort', 'rest', 'result', 'resume', 'retail', 'retain', 'retake', 'retard', 'retch', 'retell', 'retest', 'retire', 'retort', 'retry', 'retune', 'return', 'retype', 'reuse', 'revamp', 'reveal', 'revel', 'revere', 'revert', 'review', 'revile', 'revive', 'revoke', 'revolt', 'reward', 'rewind', 'reword', 'rework', 'rhyme', 'rib', 'ribbon', 'rice', 'rid', 'riddle', 'ride', 'ridge', 'riff', 'rifle', 'rift', 'rig', 'right', 'rim', 'rime', 'ring', 'rinse', 'riot', 'rip', 'ripen', 'ripple', 'rise', 'risk', 'rival', 'rivet', 'roach', 'roam', 'roar', 'roast', 'rob', 'robe', 'rock', 'rocket', 'rogue', 'roll', 'romp', 'roof', 'rook', 'room', 'roost', 'root', 'rope', 'rosin', 'rot', 'rotate', 'rouge', 'rough', 'round', 'rouse', 'rout', 'route', 'rove', 'row', 'rub', 'ruck', 'rue', 'ruff', 'ruffle', 'ruin', 'rule', 'rumble', 'rumple', 'run', 'rush', 'rust', 'rustle', 'rut', 'sack', 'sadden', 'saddle', 'safari', 'sag', 'sail', 'saint', 'sallow', 'salt', 'salute', 'sample', 'sand', 'sandal', 'sap', 'sash', 'sauce', 'sauna', 'savage', 'save', 'saw', 'say', 'scab', 'scald', 'scale', 'scalp', 'scan', 'scant', 'scape', 'scar', 'scare', 'scarf', 'scathe', 'scent', 'scheme', 'school', 'scoff', 'scold', 'scoop', 'scoot', 'scope', 'scorch', 'score', 'scorn', 'scotch', 'scour', 'scout', 'scowl', 'scrap', 'scrape', 'scrawl', 'scream', 'screen', 'screw', 'scribe', 'script', 'scroll', 'scrub', 'scrum', 'scuba', 'scud', 'scuff', 'scull', 'sculpt', 'scum', 'scurry', 'scythe', 'seal', 'seam', 'sear', 'search', 'season', 'seat', 'secede', 'second', 'sector', 'secure', 'sedate', 'seduce', 'see', 'seed', 'seek', 'seem', 'seep', 'seethe', 'seize', 'select', 'sell', 'send', 'sense', 'serge', 'serve', 'set', 'settle', 'sever', 'sew', 'shack', 'shade', 'shadow', 'shaft', 'shag', 'shake', 'sham', 'shame', 'shank', 'shape', 'share', 'shark', 'sharp', 'shave', 'shear', 'shed', 'sheer', 'shell', 'shelve', 'shield', 'shift', 'shin', 'shine', 'ship', 'shirk', 'shiver', 'shoal', 'shock', 'shoe', 'shoo', 'shoot', 'shop', 'short', 'shot', 'shout', 'shove', 'shovel', 'show', 'shower', 'shred', 'shriek', 'shrill', 'shrimp', 'shrine', 'shrink', 'shroud', 'shrug', 'shun', 'shunt', 'shut', 'shy', 'sicken', 'sickly', 'side', 'sidle', 'siege', 'sieve', 'sift', 'sigh', 'sight', 'sign', 'signal', 'signet', 'silk', 'silo', 'silt', 'silver', 'simmer', 'simper', 'simple', 'sin', 'sinew', 'sing', 'single', 'sink', 'sip', 'siphon', 'sire', 'sit', 'site', 'size', 'sizzle', 'skate', 'sketch', 'skew', 'skewer', 'ski', 'skid', 'skim', 'skimp', 'skin', 'skip', 'skirl', 'skirt', 'skulk', 'skunk', 'sky', 'slab', 'slack', 'slag', 'slake', 'slam', 'slang', 'slant', 'slap', 'slash', 'slat', 'slate', 'slave', 'slaver', 'slay', 'sleaze', 'sled', 'sledge', 'sleek', 'sleep', 'sleet', 'sleeve', 'sleigh', 'sleuth', 'slice', 'slick', 'slide', 'slight', 'slim', 'slime', 'sling', 'slink', 'slip', 'slit', 'sliver', 'slog', 'slop', 'slope', 'slosh', 'slot', 'slouch', 'slough', 'slow', 'slug', 'sluice', 'slum', 'slump', 'slur', 'slurp', 'slurry', 'slush', 'smack', 'smart', 'smash', 'smear', 'smell', 'smelt', 'smile', 'smirk', 'smite', 'smock', 'smoke', 'smooth', 'smudge', 'smut', 'snack', 'snag', 'snake', 'snap', 'snare', 'snarl', 'snatch', 'sneak', 'sneer', 'sneeze', 'snick', 'sniff', 'snip', 'snipe', 'snivel', 'snoop', 'snooze', 'snore', 'snort', 'snow', 'snub', 'snuff', 'snug', 'soak', 'soap', 'soar', 'sob', 'sober', 'sock', 'socket', 'sodden', 'soften', 'soil', 'solace', 'solder', 'sole', 'solo', 'solve', 'soot', 'soothe', 'sop', 'sorrow', 'sort', 'sortie', 'sound', 'soup', 'sour', 'source', 'south', 'sow', 'space', 'spade', 'span', 'spank', 'spar', 'spare', 'spark', 'spat', 'spawn', 'speak', 'spear', 'speck', 'speed', 'spell', 'spend', 'spew', 'sphere', 'spice', 'spike', 'spill', 'spin', 'spiral', 'spire', 'spirit', 'spit', 'spite', 'splash', 'splice', 'splint', 'split', 'spoil', 'spoke', 'sponge', 'spoof', 'spool', 'spoon', 'spoor', 'spore', 'sport', 'spot', 'spout', 'sprain', 'sprawl', 'spray', 'spread', 'sprig', 'spring', 'sprint', 'sprout', 'spruce', 'spud', 'spume', 'spur', 'spurn', 'spurt', 'spy', 'squad', 'squall', 'square', 'squash', 'squat', 'squawk', 'squeak', 'squeal', 'squib', 'squint', 'squire', 'squirm', 'squirt', 'stab', 'stable', 'stack', 'staff', 'stag', 'stage', 'stain', 'stake', 'stale', 'stalk', 'stall', 'stamp', 'stand', 'staple', 'star', 'starch', 'stare', 'start', 'starve', 'state', 'stave', 'stay', 'stead', 'steal', 'steam', 'steel', 'steep', 'steer', 'stem', 'step', 'stet', 'stew', 'stick', 'stiff', 'stifle', 'still', 'stilt', 'sting', 'stink', 'stint', 'stir', 'stitch', 'stock', 'stomp', 'stone', 'stooge', 'stool', 'stoop', 'stop', 'store', 'storm', 'story', 'stow', 'strafe', 'strain', 'strand', 'strap', 'stray', 'streak', 'stream', 'stress', 'strew', 'stride', 'strike', 'string', 'strip', 'stripe', 'strive', 'stroke', 'stroll', 'strop', 'strum', 'strut', 'stub', 'stucco', 'stud', 'study', 'stuff', 'stump', 'stun', 'stunt', 'sturdy', 'sty', 'style', 'stymie', 'subdue', 'submit', 'suck', 'sucker', 'suckle', 'suds', 'sue', 'suede', 'suffer', 'suffix', 'sugar', 'suit', 'sulk', 'sully', 'sum', 'summer', 'summit', 'summon', 'sun', 'suntan', 'sup', 'supple', 'supply', 'surf', 'surge', 'survey', 'suture', 'swab', 'swamp', 'swap', 'swarm', 'swat', 'swathe', 'sway', 'swear', 'sweat', 'sweep', 'swell', 'swerve', 'swill', 'swim', 'swing', 'swipe', 'swirl', 'swish', 'switch', 'swivel', 'swoon', 'swoop', 'swop', 'symbol', 'syrup', 'tab', 'tabby', 'table', 'taboo', 'tack', 'tackle', 'tag', 'tail', 'tailor', 'taint', 'take', 'talk', 'tallow', 'tally', 'tame', 'tamp', 'tamper', 'tan', 'tangle', 'tango', 'tank', 'tap', 'tape', 'taper', 'tar', 'target', 'tariff', 'tarry', 'tart', 'task', 'tassel', 'taste', 'tattle', 'tattoo', 'taunt', 'tax', 'taxi', 'teach', 'team', 'tear', 'tease', 'tee', 'teem', 'teeter', 'teethe', 'telex', 'tell', 'temper', 'tempt', 'tenant', 'tend', 'tender', 'tenon', 'tense', 'tent', 'tenure', 'term', 'test', 'tether', 'thank', 'thatch', 'thaw', 'thieve', 'thin', 'think', 'thirst', 'thorn', 'thou', 'thrall', 'thrash', 'thread', 'threat', 'thresh', 'thrill', 'thrive', 'throat', 'throb', 'throne', 'throng', 'throw', 'thrum', 'thrust', 'thud', 'thumb', 'thump', 'thwack', 'thwart', 'tick', 'ticket', 'tickle', 'tide', 'tidy', 'tie', 'tier', 'tile', 'till', 'tiller', 'tilt', 'timber', 'time', 'tin', 'tinge', 'tingle', 'tinker', 'tinkle', 'tinsel', 'tint', 'tip', 'tipple', 'tiptoe', 'tire', 'tissue', 'tithe', 'title', 'titter', 'toady', 'toast', 'toddle', 'toe', 'toggle', 'toil', 'token', 'toll', 'tomb', 'tomcat', 'tone', 'tongue', 'tool', 'toot', 'tooth', 'tootle', 'top', 'topple', 'torch', 'torque', 'toss', 'tot', 'total', 'totter', 'touch', 'tough', 'tour', 'tout', 'tow', 'towel', 'tower', 'toy', 'trace', 'track', 'trade', 'trail', 'train', 'tram', 'tramp', 'trance', 'trap', 'trash', 'travel', 'trawl', 'tread', 'treat', 'treble', 'tree', 'trek', 'trench', 'trend', 'triage', 'trice', 'trick', 'trill', 'trim', 'trip', 'triple', 'troll', 'troop', 'trot', 'troupe', 'trowel', 'truant', 'truck', 'trudge', 'true', 'truss', 'trust', 'try', 'tub', 'tube', 'tuck', 'tucker', 'tuft', 'tug', 'tumble', 'tun', 'tune', 'tunnel', 'turf', 'turn', 'turtle', 'tusk', 'tussle', 'tutor', 'twang', 'tweak', 'tweet', 'twig', 'twill', 'twin', 'twine', 'twinge', 'twirl', 'twist', 'twitch', 'type', 'typify', 'umpire', 'unable', 'unbend', 'unbolt', 'unclog', 'uncoil', 'undo', 'unfit', 'unfold', 'unfurl', 'unhand', 'unify', 'unite', 'unjam', 'unlace', 'unlink', 'unload', 'unlock', 'unmask', 'unpack', 'unpick', 'unplug', 'unroll', 'unseal', 'unseat', 'untie', 'unveil', 'unwind', 'unwrap', 'unzip', 'up', 'update', 'uphold', 'uplift', 'upload', 'uproot', 'upset', 'upturn', 'urge', 'use', 'usher', 'usurp', 'utter', 'vacate', 'vacuum', 'valet', 'value', 'valve', 'vamp', 'vanish', 'vary', 'vat', 'vault', 'vector', 'veer', 'veil', 'vein', 'vend', 'veneer', 'vent', 'verge', 'verify', 'verse', 'vest', 'vet', 'veto', 'vex', 'vial', 'vice', 'video', 'vie', 'view', 'vilify', 'visa', 'vision', 'visit', 'visor', 'voice', 'void', 'volley', 'vomit', 'voodoo', 'vote', 'vouch', 'vow', 'voyage', 'wad', 'waddle', 'wade', 'wafer', 'waffle', 'waft', 'wag', 'wager', 'waggle', 'wagon', 'wail', 'wait', 'waive', 'wake', 'waken', 'walk', 'wall', 'wallow', 'waltz', 'wan', 'wander', 'wane', 'want', 'wanton', 'war', 'warble', 'ward', 'warm', 'warn', 'warp', 'wash', 'waste', 'watch', 'water', 'wattle', 'wave', 'waver', 'wax', 'waylay', 'weaken', 'wean', 'weapon', 'wear', 'weary', 'weasel', 'weave', 'web', 'wed', 'wedge', 'weed', 'weep', 'weigh', 'weight', 'weld', 'well', 'welt', 'welter', 'wench', 'wend', 'wet', 'whack', 'whale', 'wharf', 'wheel', 'wheeze', 'whelp', 'whet', 'whiff', 'while', 'whine', 'whinny', 'whip', 'whir', 'whirl', 'whirr', 'whisk', 'white', 'whiten', 'whizz', 'whoop', 'whoosh', 'wick', 'widen', 'widow', 'wield', 'wig', 'wiggle', 'wild', 'wile', 'will', 'wilt', 'wimple', 'win', 'wince', 'winch', 'wind', 'window', 'wine', 'wing', 'wink', 'winnow', 'winter', 'wipe', 'wire', 'wish', 'wisp', 'wit', 'witch', 'wither', 'wobble', 'wolf', 'wonder', 'wont', 'woo', 'wood', 'word', 'work', 'worm', 'worry', 'worsen', 'worst', 'wound', 'wow', 'wrack', 'wrap', 'wreak', 'wreath', 'wreck', 'wrench', 'wrest', 'wring', 'write', 'writhe', 'wrong', 'x-ray', 'xerox', 'yacht', 'yak', 'yap', 'yard', 'yaw', 'yawn', 'yearn', 'yeast', 'yell', 'yellow', 'yelp', 'yen', 'yes', 'yield', 'yo-yo', 'yodel', 'yoke', 'zero', 'zigzag', 'zinc', 'zip', 'zipper', 'zone', 'zoom'
];
const nouns = [
    'abacus', 'abbey', 'abroad', 'abuse', 'access', 'acid', 'act', 'action', 'actor', 'ad', 'adult', 'advice', 'affair', 'affect', 'age', 'agency', 'agenda', 'agent', 'aglet', 'aid', 'air', 'airbag', 'airbus', 'alarm', 'alb', 'alcove', 'alder', 'alibi', 'alley', 'alloy', 'almond', 'alpaca', 'alpha', 'alto', 'amount', 'analog', 'anger', 'angle', 'angora', 'animal', 'anime', 'ankle', 'anklet', 'annual', 'anorak', 'answer', 'ant', 'antler', 'ape', 'appeal', 'apple', 'apron', 'apse', 'arch', 'archer', 'area', 'arm', 'armor', 'army', 'arrow', 'art', 'ascot', 'ash', 'ashram', 'aside', 'ask', 'aspect', 'assist', 'atom', 'atrium', 'attack', 'attic', 'aunt', 'author', 'avenue', 'award', 'babe', 'baboon', 'baby', 'back', 'bacon', 'bad', 'badge', 'badger', 'bag', 'bagel', 'bail', 'bait', 'bake', 'baker', 'bakery', 'ball', 'ballet', 'bamboo', 'banana', 'band', 'bangle', 'banjo', 'bank', 'banker', 'baobab', 'bar', 'barber', 'barge', 'barium', 'barn', 'base', 'basin', 'basis', 'basket', 'bass', 'bat', 'bath', 'bather', 'batter', 'battle', 'bay', 'bayou', 'beach', 'bead', 'beak', 'beam', 'bean', 'beanie', 'bear', 'beard', 'beast', 'beat', 'beauty', 'beaver', 'bed', 'bee', 'beech', 'beef', 'beer', 'beet', 'beetle', 'beggar', 'behest', 'being', 'belfry', 'belief', 'bell', 'belly', 'belt', 'bench', 'bend', 'bengal', 'beret', 'berry', 'bet', 'beyond', 'bid', 'bidet', 'big', 'bijou', 'bike', 'bikini', 'bill', 'bin', 'birch', 'bird', 'birth', 'bit', 'bite', 'bitter', 'black', 'blade', 'blame', 'blank', 'blazer', 'blight', 'blind', 'block', 'blood', 'bloom', 'blouse', 'blow', 'blue', 'boar', 'board', 'boat', 'bobcat', 'body', 'bog', 'bolero', 'bolt', 'bomb', 'bomber', 'bone', 'bongo', 'bonnet', 'bonsai', 'bonus', 'book', 'boot', 'bootee', 'bootie', 'boots', 'booty', 'border', 'bore', 'bosom', 'boss', 'botany', 'bother', 'bottle', 'bottom', 'bough', 'bow', 'bower', 'bowl', 'bowler', 'bowtie', 'box', 'boxer', 'boy', 'bra', 'brace', 'brain', 'brake', 'branch', 'brand', 'brandy', 'brass', 'brave', 'bread', 'break', 'breast', 'breath', 'breeze', 'brick', 'bridge', 'brief', 'briefs', 'broad', 'broker', 'brome', 'bronco', 'bronze', 'brooch', 'brood', 'brook', 'broom', 'brow', 'brown', 'brush', 'bubble', 'bucket', 'buckle', 'bud', 'buddy', 'budget', 'buffer', 'buffet', 'bug', 'buggy', 'bugle', 'bulb', 'bull', 'bullet', 'bumper', 'bun', 'bunch', 'burn', 'burst', 'bus', 'bush', 'bust', 'bustle', 'butane', 'butter', 'button', 'buy', 'buyer', 'cabana', 'cabin', 'cable', 'cacao', 'cactus', 'caddy', 'cadet', 'cafe', 'caftan', 'cake', 'calf', 'calico', 'call', 'calm', 'camel', 'cameo', 'camera', 'camp', 'can', 'canal', 'cancel', 'cancer', 'candle', 'candy', 'cane', 'cannon', 'canoe', 'canon', 'canopy', 'canvas', 'cap', 'cape', 'capon', 'car', 'carbon', 'card', 'care', 'career', 'cargo', 'carol', 'carp', 'carpet', 'carrot', 'carry', 'cart', 'case', 'cash', 'casino', 'cast', 'castle', 'cat', 'catch', 'catsup', 'cattle', 'cause', 'cave', 'cd', 'celery', 'cell', 'cellar', 'cello', 'cement', 'census', 'cent', 'center', 'cereal', 'chafe', 'chain', 'chair', 'chaise', 'chalet', 'chalk', 'chance', 'change', 'chaos', 'chap', 'chapel', 'chard', 'charge', 'charm', 'chart', 'check', 'cheek', 'chef', 'cheque', 'cherry', 'chess', 'chest', 'chick', 'chief', 'child', 'chill', 'chime', 'chin', 'chino', 'chip', 'chive', 'choice', 'choker', 'chop', 'chord', 'chrome', 'chub', 'chug', 'church', 'churn', 'cicada', 'cinema', 'circle', 'cirrus', 'city', 'claim', 'clam', 'clank', 'clasp', 'class', 'clause', 'clave', 'cleat', 'clef', 'cleric', 'clerk', 'click', 'client', 'cliff', 'climb', 'clip', 'cloak', 'clock', 'clogs', 'close', 'closet', 'cloth', 'cloud', 'cloudy', 'clove', 'clover', 'club', 'clue', 'clutch', 'coach', 'coal', 'coast', 'coat', 'cob', 'cobweb', 'cocoa', 'cod', 'code', 'codon', 'coffee', 'coffin', 'coil', 'coin', 'coke', 'cold', 'collar', 'colon', 'colony', 'color', 'colt', 'column', 'comb', 'combat', 'comic', 'comma', 'common', 'condor', 'cone', 'conga', 'congo', 'consul', 'cook', 'cookie', 'cope', 'copper', 'copy', 'cord', 'cork', 'corn', 'corner', 'cornet', 'corral', 'cost', 'cot', 'cotton', 'couch', 'cougar', 'cough', 'count', 'county', 'couple', 'course', 'court', 'cousin', 'cover', 'cow', 'cowboy', 'crab', 'crack', 'cradle', 'craft', 'crash', 'crate', 'cravat', 'craw', 'crayon', 'crazy', 'cream', 'creche', 'credit', 'creek', 'crest', 'crew', 'crib', 'crime', 'crocus', 'crook', 'crop', 'cross', 'crotch', 'croup', 'crow', 'crowd', 'crown', 'crude', 'crush', 'cry', 'cub', 'cuckoo', 'cup', 'cupola', 'curio', 'curl', 'curler', 'cursor', 'curve', 'cut', 'cutlet', 'cycle', 'cymbal', 'cynic', 'cyst', 'dad', 'dagger', 'dahlia', 'daisy', 'damage', 'dame', 'dance', 'dancer', 'danger', 'daniel', 'dare', 'dark', 'dart', 'dash', 'data', 'date', 'david', 'day', 'daybed', 'dead', 'deal', 'dealer', 'dear', 'death', 'debate', 'debt', 'debtor', 'decade', 'deck', 'deep', 'deer', 'degree', 'delay', 'delete', 'demand', 'demur', 'den', 'denim', 'depth', 'deputy', 'derby', 'desert', 'design', 'desire', 'desk', 'detail', 'device', 'devil', 'dew', 'dhow', 'diadem', 'dibble', 'dickey', 'diet', 'dig', 'digger', 'dill', 'dime', 'dimple', 'diner', 'dinghy', 'dinner', 'dirndl', 'dirt', 'disco', 'dish', 'dishes', 'disk', 'divan', 'diver', 'divide', 'diving', 'dock', 'doctor', 'doe', 'dog', 'doll', 'dollar', 'dolman', 'domain', 'donkey', 'door', 'dory', 'dot', 'double', 'doubt', 'draft', 'drag', 'dragon', 'drain', 'drake', 'drama', 'draw', 'drawer', 'dream', 'dress', 'drill', 'drink', 'drive', 'driver', 'drop', 'drug', 'drum', 'drunk', 'dry', 'dryer', 'duck', 'dud', 'due', 'duffel', 'dugout', 'dump', 'dust', 'duster', 'duty', 'dwarf', 'dynamo', 'eagle', 'ear', 'earth', 'ease', 'easel', 'east', 'eat', 'eave', 'e-book', 'eddy', 'edge', 'edger', 'editor', 'edward', 'eel', 'effect', 'effort', 'egg', 'eggnog', 'eight', 'elbow', 'elixir', 'elk', 'elm', 'emery', 'employ', 'emu', 'end', 'enemy', 'energy', 'engine', 'enigma', 'entry', 'envy', 'epee', 'epoch', 'eponym', 'epoxy', 'equal', 'era', 'error', 'escape', 'ese', 'essay', 'estate', 'ethics', 'europe', 'event', 'exam', 'excuse', 'exile', 'exit', 'expert', 'extent', 'eye', 'eyelid', 'face', 'facet', 'fact', 'factor', 'fail', 'fairy', 'faith', 'fall', 'fame', 'family', 'fan', 'fang', 'fanny', 'farm', 'farmer', 'fascia', 'fat', 'father', 'faucet', 'fault', 'fawn', 'fax', 'fear', 'feast', 'fedora', 'fee', 'feed', 'feel', 'feet', 'felony', 'female', 'fen', 'fence', 'fender', 'ferry', 'few', 'fiber', 'fibre', 'fiddle', 'field', 'fifth', 'fight', 'figure', 'file', 'fill', 'filly', 'film', 'filth', 'final', 'find', 'fine', 'finger', 'finish', 'fir', 'fire', 'fish', 'fix', 'flag', 'flame', 'flare', 'flash', 'flat', 'flavor', 'flax', 'fleck', 'fleece', 'flesh', 'flight', 'flock', 'flood', 'floor', 'flour', 'flow', 'flower', 'flu', 'fluke', 'flute', 'fly', 'foam', 'fob', 'focus', 'fog', 'fold', 'folder', 'fondue', 'font', 'food', 'foot', 'foray', 'force', 'forest', 'fork', 'form', 'formal', 'format', 'former', 'fort', 'forum', 'fowl', 'fox', 'frame', 'freeze', 'freon', 'fresco', 'fridge', 'friend', 'fringe', 'frock', 'frog', 'front', 'frost', 'frown', 'fruit', 'fuel', 'full', 'fun', 'funny', 'fur', 'futon', 'future', 'gaffer', 'gain', 'gale', 'galley', 'gallon', 'galn', 'game', 'gander', 'gap', 'garage', 'garb', 'garden', 'garlic', 'garter', 'gas', 'gate', 'gather', 'gauge', 'gazebo', 'gear', 'geese', 'gem', 'gender', 'gene', 'george', 'gerbil', 'geyser', 'ghost', 'giant', 'gift', 'girdle', 'girl', 'git', 'give', 'glad', 'gland', 'glass', 'glen', 'glider', 'glove', 'gloves', 'glue', 'glut', 'go', 'goal', 'goat', 'god', 'gold', 'golf', 'gong', 'good', 'goodie', 'goose', 'gopher', 'gossip', 'gown', 'grab', 'grade', 'grain', 'gram', 'grand', 'granny', 'grape', 'graph', 'grass', 'gray', 'grease', 'great', 'greek', 'green', 'grey', 'grief', 'grill', 'grip', 'grit', 'ground', 'group', 'grouse', 'growth', 'guard', 'guess', 'guest', 'guide', 'guilt', 'guilty', 'guitar', 'gum', 'gun', 'gutter', 'guy', 'gym', 'gyro', 'habit', 'hail', 'hair', 'half', 'hall', 'hamaki', 'hammer', 'hand', 'handle', 'hang', 'harbor', 'harm', 'harp', 'hat', 'hatbox', 'hate', 'hatred', 'haunt', 'hawk', 'hay', 'head', 'health', 'heart', 'hearth', 'heat', 'heater', 'heaven', 'heavy', 'hedge', 'heel', 'height', 'helen', 'helium', 'hell', 'hello', 'helmet', 'helo', 'help', 'hemp', 'hen', 'herb', 'heron', 'heyday', 'hide', 'high', 'hill', 'hip', 'hire', 'hit', 'hive', 'hobbit', 'hobby', 'hockey', 'hoe', 'hog', 'hold', 'hole', 'home', 'honey', 'hood', 'hoof', 'hook', 'hope', 'hops', 'horn', 'hornet', 'horror', 'horse', 'hose', 'host', 'hostel', 'hot', 'hotel', 'hour', 'house', 'hovel', 'hub', 'hubcap', 'hugger', 'human', 'humor', 'humour', 'hunger', 'hunt', 'hurry', 'hurt', 'hut', 'hutch', 'hyena', 'ice', 'icicle', 'icon', 'idea', 'ideal', 'if', 'igloo', 'image', 'impact', 'inbox', 'inch', 'income', 'index', 'injury', 'ink', 'inlay', 'inn', 'input', 'insect', 'inside', 'invite', 'iris', 'iron', 'irony', 'island', 'issue', 'it', 'item', 'jackal', 'jacket', 'jaguar', 'jail', 'jam', 'james', 'jar', 'jaw', 'jeans', 'jeep', 'jeff', 'jelly', 'jet', 'jewel', 'jiffy', 'job', 'jockey', 'joey', 'join', 'joint', 'joke', 'jot', 'joy', 'judge', 'judo', 'juice', 'jumbo', 'jump', 'jumper', 'junior', 'junk', 'junker', 'junket', 'jury', 'jute', 'kale', 'karate', 'karen', 'kayak', 'kazoo', 'keep', 'kendo', 'ketch', 'kettle', 'key', 'kick', 'kid', 'kidney', 'kill', 'kilt', 'kimono', 'kind', 'king', 'kiosk', 'kiss', 'kite', 'kitten', 'kitty', 'klomps', 'knee', 'knife', 'knight', 'knot', 'koala', 'lab', 'labour', 'lace', 'lack', 'ladder', 'lady', 'lake', 'lamb', 'lamp', 'lan', 'lanai', 'land', 'lap', 'lapdog', 'laptop', 'larch', 'larder', 'lark', 'latex', 'lathe', 'latte', 'laugh', 'lava', 'law', 'lawn', 'lawyer', 'lay', 'layer', 'lead', 'leader', 'leaf', 'league', 'leaker', 'leash', 'leave', 'leaver', 'leek', 'leg', 'legal', 'legume', 'lei', 'lemon', 'lemur', 'length', 'lentil', 'lesson', 'let', 'letter', 'level', 'lever', 'lie', 'lier', 'life', 'lift', 'light', 'lilac', 'lily', 'limit', 'limo', 'line', 'linen', 'liner', 'link', 'lion', 'lip', 'liquid', 'liquor', 'lisa', 'list', 'listen', 'litter', 'liver', 'living', 'lizard', 'llama', 'load', 'loaf', 'loafer', 'loan', 'local', 'lock', 'locker', 'locket', 'locust', 'loft', 'log', 'loggia', 'logic', 'long', 'look', 'loss', 'lot', 'lotion', 'lounge', 'lout', 'love', 'low', 'luck', 'lumber', 'lunch', 'lung', 'lunge', 'lute', 'lycra', 'lye', 'lynx', 'lyre', 'lyric', 'magic', 'maid', 'maiden', 'mail', 'main', 'major', 'make', 'makeup', 'male', 'mall', 'mallet', 'mambo', 'man', 'maniac', 'manner', 'manor', 'mantel', 'mantle', 'mantua', 'manx', 'many', 'map', 'maple', 'maraca', 'marble', 'mare', 'margin', 'mark', 'market', 'marsh', 'mask', 'mass', 'master', 'mat', 'match', 'mate', 'math', 'matter', 'maybe', 'mayor', 'meal', 'meat', 'media', 'medium', 'meet', 'melody', 'member', 'memory', 'men', 'menu', 'mess', 'metal', 'meteor', 'meter', 'method', 'metro', 'mice', 'middle', 'midi', 'might', 'mile', 'milk', 'mime', 'mimosa', 'mind', 'mine', 'mini', 'minion', 'minor', 'mint', 'minute', 'mirror', 'misfit', 'miss', 'mist', 'mister', 'miter', 'mitten', 'mix', 'mixer', 'moat', 'mobile', 'mocha', 'mode', 'model', 'modem', 'mole', 'mom', 'moment', 'money', 'monger', 'monkey', 'month', 'mood', 'moon', 'mop', 'morsel', 'mosque', 'most', 'motel', 'moth', 'mother', 'motion', 'motor', 'mound', 'mouse', 'mouser', 'mousse', 'mouth', 'mouton', 'move', 'mover', 'movie', 'mower', 'mud', 'mug', 'mukluk', 'mule', 'muscle', 'museum', 'music', 'mutt', 'n', 'nail', 'name', 'naming', 'napkin', 'nasty', 'nation', 'native', 'nature', 'neat', 'neck', 'need', 'needle', 'neon', 'nephew', 'nerve', 'nest', 'net', 'news', 'nexus', 'nicety', 'niche', 'nickel', 'niece', 'night', 'nobody', 'node', 'noise', 'noodle', 'normal', 'norse', 'north', 'nose', 'note', 'notice', 'notify', 'nougat', 'novel', 'nudge', 'number', 'nurse', 'nut', 'nylon', 'oak', 'oar', 'oasis', 'obi', 'object', 'oboe', 'ocean', 'ocelot', 'octave', 'octavo', 'octet', 'oeuvre', 'offer', 'office', 'oil', 'okra', 'oldie', 'olive', 'omega', 'omelet', 'one', 'onion', 'open', 'opera', 'opium', 'option', 'orange', 'orator', 'orchid', 'order', 'organ', 'osprey', 'other', 'others', 'ott', 'otter', 'ounce', 'outfit', 'outlay', 'output', 'outset', 'oval', 'ovary', 'oven', 'owl', 'owner', 'ox', 'oxen', 'oxford', 'oxygen', 'oyster', 'pace', 'pack', 'packet', 'pad', 'paddle', 'page', 'pagoda', 'pail', 'pain', 'paint', 'pair', 'pajama', 'palm', 'pan', 'panda', 'panic', 'pansy', 'pantry', 'pants', 'panty', 'paper', 'parade', 'parcel', 'pard', 'parent', 'park', 'parka', 'parrot', 'part', 'party', 'pass', 'past', 'pasta', 'paste', 'pastor', 'pastry', 'patch', 'path', 'patina', 'patio', 'patrol', 'pause', 'paw', 'pay', 'payee', 'pea', 'peace', 'peach', 'peak', 'peanut', 'pear', 'pearl', 'pedal', 'peen', 'peer', 'pelt', 'pen', 'pencil', 'peony', 'people', 'pepper', 'perch', 'period', 'permit', 'perp', 'person', 'pest', 'pet', 'petal', 'pew', 'pha', 'phase', 'phone', 'photo', 'phrase', 'piano', 'pick', 'pickax', 'picket', 'pickle', 'pie', 'piece', 'pier', 'piety', 'pig', 'pigeon', 'pike', 'pile', 'pillow', 'pilot', 'pimp', 'pimple', 'pin', 'pine', 'ping', 'pink', 'pinkie', 'pint', 'pinto', 'pipe', 'piracy', 'piss', 'pitch', 'pith', 'pizza', 'place', 'plain', 'plan', 'plane', 'planet', 'plant', 'plate', 'play', 'player', 'plenty', 'plier', 'plot', 'plough', 'plover', 'plow', 'plume', 'pocket', 'poem', 'poet', 'poetry', 'point', 'poison', 'pole', 'police', 'policy', 'polish', 'polo', 'pompom', 'poncho', 'pond', 'pony', 'poof', 'pool', 'pop', 'poppy', 'porch', 'port', 'porter', 'post', 'poster', 'pot', 'potato', 'potty', 'pouch', 'pound', 'powder', 'power', 'press', 'price', 'pride', 'priest', 'prince', 'print', 'prior', 'prison', 'prize', 'profit', 'prompt', 'proof', 'prose', 'prow', 'pruner', 'public', 'puddle', 'puffin', 'pull', 'pulley', 'puma', 'pump', 'punch', 'pupa', 'pupil', 'puppy', 'purple', 'purse', 'push', 'pusher', 'put', 'pvc', 'pyjama', 'quail', 'quart', 'quartz', 'queen', 'quiet', 'quill', 'quilt', 'quince', 'quit', 'quiver', 'quote', 'rabbi', 'rabbit', 'race', 'racer', 'racing', 'racism', 'racist', 'rack', 'radar', 'radio', 'radish', 'raffle', 'raft', 'rag', 'rage', 'rail', 'rain', 'raise', 'rake', 'ram', 'ramie', 'ranch', 'random', 'range', 'rank', 'rat', 'rate', 'ratio', 'raven', 'raw', 'ray', 'rayon', 'reach', 'read', 'reamer', 'rear', 'reason', 'recess', 'recipe', 'record', 'red', 'reef', 'refund', 'refuse', 'region', 'regret', 'reject', 'relief', 'relish', 'remote', 'remove', 'rent', 'repair', 'repeat', 'reply', 'report', 'resale', 'resist', 'resort', 'rest', 'result', 'retina', 'return', 'reveal', 'review', 'reward', 'rhyme', 'rhythm', 'rice', 'rich', 'riddle', 'ride', 'rider', 'ridge', 'rifle', 'right', 'rim', 'ring', 'rip', 'ripple', 'rise', 'riser', 'risk', 'river', 'road', 'roast', 'robe', 'robin', 'rock', 'rocker', 'rocket', 'rod', 'role', 'roll', 'roller', 'roof', 'room', 'root', 'rope', 'rose', 'rotate', 'rough', 'round', 'route', 'router', 'row', 'royal', 'rub', 'rubber', 'rubric', 'ruckus', 'ruffle', 'rugby', 'ruin', 'rule', 'rum', 'run', 'runner', 'rush', 'ruth', 'ry', 'sabre', 'sack', 'sad', 'saddle', 'safe', 'safety', 'sage', 'sail', 'sailor', 'salad', 'salary', 'sale', 'salmon', 'salon', 'saloon', 'salt', 'sampan', 'sample', 'sand', 'sari', 'sarong', 'sash', 'satin', 'satire', 'sauce', 'save', 'saving', 'savior', 'saw', 'scale', 'scarf', 'scene', 'scent', 'scheme', 'school', 'score', 'scorn', 'scow', 'screen', 'screw', 'scrim', 'scrip', 'script', 'sea', 'seal', 'search', 'season', 'seat', 'second', 'secret', 'sector', 'secure', 'seed', 'seeder', 'select', 'self', 'sell', 'senior', 'sense', 'sepal', 'series', 'serve', 'server', 'set', 'sewer', 'sex', 'shack', 'shade', 'shadow', 'shake', 'shaker', 'shame', 'shanty', 'shape', 'share', 'shark', 'sharon', 'shawl', 'she', 'shears', 'sheath', 'shed', 'sheep', 'sheet', 'shelf', 'shell', 'sherry', 'shield', 'shift', 'shin', 'shine', 'ship', 'shirt', 'shoat', 'shock', 'shoe', 'shoes', 'shofar', 'shoot', 'shop', 'shore', 'shorts', 'shot', 'shovel', 'show', 'shower', 'shred', 'shrimp', 'shrine', 'sick', 'side', 'siding', 'sign', 'signal', 'signet', 'signup', 'silica', 'silk', 'sill', 'silly', 'silo', 'silver', 'simple', 'sing', 'singer', 'single', 'sink', 'sir', 'sister', 'sitar', 'site', 'size', 'skate', 'skiing', 'skill', 'skin', 'skirt', 'skull', 'skunk', 'sky', 'slash', 'slave', 'sled', 'sledge', 'sleep', 'sleet', 'sleuth', 'slice', 'slide', 'slider', 'slime', 'slip', 'slope', 'sloth', 'smash', 'smell', 'smile', 'smock', 'smog', 'smoke', 'snail', 'snake', 'sneeze', 'snob', 'snorer', 'snow', 'soap', 'soccer', 'sock', 'socks', 'soda', 'sofa', 'soft', 'soil', 'solid', 'son', 'song', 'sonnet', 'soot', 'sorbet', 'sorrow', 'sort', 'sound', 'soup', 'source', 'south', 'sow', 'soy', 'space', 'spade', 'spank', 'spare', 'spark', 'spasm', 'spear', 'speech', 'speed', 'spell', 'spend', 'sphere', 'sphynx', 'spider', 'spike', 'spine', 'spiral', 'spirit', 'spite', 'spleen', 'split', 'sponge', 'spoon', 'sport', 'spot', 'spray', 'spread', 'spring', 'sprout', 'spruce', 'spume', 'spur', 'spy', 'square', 'squash', 'squid', 'stable', 'stack', 'staff', 'stag', 'stage', 'stain', 'stair', 'stamen', 'stamp', 'stance', 'stand', 'star', 'start', 'state', 'status', 'stay', 'steak', 'steal', 'steam', 'steel', 'stem', 'step', 'steps', 'stew', 'stick', 'still', 'stitch', 'stock', 'stole', 'stone', 'stool', 'stop', 'store', 'storey', 'storm', 'story', 'stove', 'strain', 'strait', 'strap', 'straw', 'stream', 'street', 'stress', 'strike', 'string', 'strip', 'stroke', 'stud', 'studio', 'study', 'stuff', 'stupid', 'style', 'stylus', 'suburb', 'subway', 'suck', 'suede', 'sugar', 'suit', 'sultan', 'summer', 'sun', 'sunday', 'supply', 'survey', 'sushi', 'SUV', 'swamp', 'swan', 'swath', 'sweat', 'sweats', 'sweet', 'sweets', 'swell', 'swim', 'swing', 'swiss', 'switch', 'swivel', 'sword', 'synod', 'syrup', 'system', 'tabby', 'table', 'tackle', 'tail', 'tailor', 'tale', 'talk', 'tam', 'tandem', 'tank', 'tanker', 'tap', 'tard', 'target', 'task', 'tassel', 'taste', 'tatami', 'tattoo', 'tavern', 'tax', 'taxi', 'tea', 'teach', 'team', 'tear', 'teen', 'teeth', 'tell', 'teller', 'temp', 'temper', 'temple', 'tempo', 'tennis', 'tenor', 'tent', 'tepee', 'term', 'test', 'text', 'thanks', 'thaw', 'theism', 'theme', 'theory', 'thigh', 'thing', 'thirst', 'thomas', 'thong', 'thongs', 'thorn', 'thread', 'thrill', 'throat', 'throne', 'thrush', 'thumb', 'tiara', 'tic', 'ticket', 'tie', 'tiger', 'tight', 'tights', 'tile', 'till', 'timber', 'time', 'timer', 'tin', 'tinkle', 'tip', 'tire', 'tissue', 'title', 'toad', 'toast', 'today', 'toe', 'toga', 'togs', 'toilet', 'tom', 'tomato', 'ton', 'tone', 'tongue', 'tool', 'toot', 'tooth', 'top', 'topic', 'toque', 'torso', 'tosser', 'total', 'tote', 'touch', 'tough', 'tour', 'towel', 'tower', 'town', 'toy', 'track', 'trade', 'trail', 'train', 'tram', 'tramp', 'trash', 'travel', 'tray', 'treat', 'tree', 'tremor', 'trench', 'trial', 'tribe', 'trick', 'trim', 'trip', 'tripod', 'trout', 'trove', 'trowel', 'truck', 'trunk', 'trust', 'truth', 'try', 'tub', 'tuba', 'tube', 'tulip', 'tummy', 'tuna', 'tune', 'tunic', 'tunnel', 'turban', 'turn', 'turnip', 'turret', 'turtle', 'tussle', 'tutu', 'tuxedo', 'tv', 'twig', 'twine', 'twist', 'two', 'type', 'tyvek', 'uncle', 'union', 'unique', 'unit', 'unity', 'upper', 'urn', 'usage', 'use', 'user', 'usher', 'usual', 'vacuum', 'valley', 'value', 'van', 'vane', 'vanity', 'vase', 'vast', 'vault', 'veal', 'veil', 'vein', 'veldt', 'vellum', 'velvet', 'venom', 'verse', 'verve', 'vessel', 'vest', 'vibe', 'video', 'view', 'villa', 'vinyl', 'viola', 'violet', 'violin', 'virtue', 'virus', 'vise', 'vision', 'visit', 'visor', 'visual', 'vixen', 'voice', 'volume', 'voyage', 'wad', 'wafer', 'waffle', 'waist', 'wait', 'waiter', 'wake', 'walk', 'walker', 'wall', 'wallet', 'walnut', 'walrus', 'wampum', 'war', 'warden', 'warmth', 'wash', 'washer', 'wasp', 'waste', 'watch', 'water', 'wave', 'wax', 'way', 'wealth', 'weapon', 'wear', 'weasel', 'web', 'wedge', 'weed', 'weeder', 'week', 'weight', 'weird', 'well', 'west', 'whale', 'wharf', 'wheat', 'wheel', 'while', 'whip', 'white', 'whole', 'whorl', 'width', 'wife', 'will', 'willow', 'win', 'wind', 'window', 'wine', 'wing', 'winner', 'winter', 'wire', 'wisdom', 'wish', 'witch', 'wolf', 'wombat', 'women', 'wonder', 'wood', 'wool', 'woolen', 'word', 'work', 'worker', 'world', 'worm', 'worry', 'worth', 'worthy', 'wound', 'wrap', 'wren', 'wrench', 'wrist', 'writer', 'wrong', 'yacht', 'yak', 'yam', 'yard', 'yarn', 'yawl', 'year', 'yeast', 'yellow', 'yew', 'yin', 'yoga', 'yogurt', 'yoke', 'you', 'young', 'youth', 'yurt', 'zebra', 'zephyr', 'zinc', 'zipper', 'zither', 'zone', 'zoo'
];
const adverbs = [
    'ably', 'acidly', 'airily', 'ally', 'amply', 'apply', 'aptly', 'archly', 'avidly', 'badly', 'baldly', 'barely', 'basely', 'belly', 'bodily', 'boldly', 'bubbly', 'bully', 'burly', 'busily', 'calmly', 'chilly', 'coldly', 'comely', 'comply', 'coolly', 'cosily', 'costly', 'coyly', 'cuddly', 'curly', 'curtly', 'daily', 'dally', 'damply', 'darkly', 'deadly', 'dearly', 'deeply', 'deftly', 'dimly', 'direly', 'doily', 'dolly', 'doubly', 'dourly', 'drily', 'dryly', 'dually', 'dully', 'duly', 'dumbly', 'early', 'easily', 'edgily', 'eerily', 'evenly', 'evilly', 'fairly', 'family', 'feebly', 'fiddly', 'filly', 'finely', 'firmly', 'fitly', 'flatly', 'fly', 'folly', 'fondly', 'foully', 'freely', 'frilly', 'fully', 'gadfly', 'gaily', 'gamely', 'gangly', 'gently', 'giggly', 'gladly', 'glibly', 'glumly', 'godly', 'golly', 'goodly', 'googly', 'grimly', 'grisly', 'gully', 'hardly', 'hazily', 'highly', 'hilly', 'holly', 'holy', 'homely', 'homily', 'hotly', 'hourly', 'hugely', 'humbly', 'icily', 'idly', 'imply', 'jangly', 'jelly', 'jokily', 'jolly', 'justly', 'keenly', 'kindly', 'kingly', 'lamely', 'lastly', 'lately', 'lazily', 'likely', 'lily', 'limply', 'lively', 'lolly', 'lonely', 'lordly', 'loudly', 'lovely', 'lowly', 'madly', 'mainly', 'manly', 'mayfly', 'mealy', 'meanly', 'measly', 'meekly', 'merely', 'mildly', 'mostly', 'mutely', 'namely', 'nearly', 'neatly', 'newly', 'nicely', 'nimbly', 'nobly', 'nosily', 'numbly', 'oddly', 'oily', 'only', 'openly', 'orally', 'overly', 'palely', 'partly', 'pearly', 'pebbly', 'pertly', 'pimply', 'ply', 'poorly', 'portly', 'primly', 'purely', 'rally', 'rarely', 'rashly', 'really', 'rely', 'reply', 'richly', 'ripely', 'rosily', 'rudely', 'sadly', 'safely', 'sagely', 'sally', 'sanely', 'scaly', 'seemly', 'shyly', 'sickly', 'silly', 'simply', 'singly', 'slily', 'slowly', 'sly', 'slyly', 'smelly', 'smugly', 'snugly', 'softly', 'solely', 'sorely', 'sourly', 'stably', 'steely', 'subtly', 'sully', 'supply', 'surely', 'surly', 'tally', 'tamely', 'tartly', 'tautly', 'termly', 'thinly', 'tidily', 'timely', 'tingly', 'tinkly', 'triply', 'truly', 'ugly', 'unduly', 'unholy', 'unruly', 'vainly', 'vastly', 'viably', 'vilely', 'waggly', 'wanly', 'warily', 'warmly', 'wavily', 'weakly', 'weekly', 'wetly', 'wholly', 'widely', 'wifely', 'wildly', 'wily', 'wisely', 'wobbly', 'woolly', 'wryly', 'yearly'
];
const interjections = [
    'aha', 'ahem', 'ahh', 'ahoy', 'alas', 'arg', 'aw', 'bam', 'bingo', 'blah', 'boo', 'bravo', 'brrr', 'cheers', 'dang', 'drat', 'darn', 'duh', 'eek', 'eh', 'encore', 'eureka', 'gee', 'golly', 'gosh', 'haha', 'hello', 'hey', 'hmm', 'huh', 'humph', 'hurray', 'oh', 'oh my', 'oops', 'ouch', 'ow', 'phew', 'phooey', 'pooh', 'pow', 'rats', 'shh', 'shoo', 'thanks', 'there', 'uh-huh', 'uh-oh', 'ugh', 'wahoo', 'well', 'whoa', 'whoops', 'wow', 'yeah', 'yes', 'yikes', 'yippee', 'yo', 'yuck'
];
const adjectives = [
    'abject', 'abrupt', 'absent', 'absurd', 'active', 'acute', 'adept', 'adroit', 'aerial', 'agile', 'airy', 'alert', 'aloof', 'amoral', 'amused', 'angry', 'apt', 'arch', 'ardent', 'artful', 'august', 'aural', 'avowed', 'awful', 'bad', 'banal', 'basic', 'bawdy', 'benign', 'bitter', 'bland', 'blank', 'bleak', 'blind', 'blithe', 'blunt', 'boyish', 'brave', 'breezy', 'brief', 'bright', 'broad', 'broken', 'busy', 'cagy', 'cm', 'candid', 'canny', 'carnal', 'casual', 'catty', 'caudal', 'chaste', 'cheeky', 'clear', 'clever', 'clinic', 'clumsy', 'coarse', 'cocky', 'cogent', 'cold', 'conic', 'coward', 'coy', 'cozy', 'crass', 'craven', 'crazy', 'creepy', 'crude', 'curt', 'cute', 'cynic', 'dainty', 'dark', 'dazed', 'dear', 'decent', 'deep', 'deft', 'demure', 'dense', 'dim', 'dire', 'dismal', 'dizzy', 'dogged', 'droll', 'dry', 'dull', 'eager', 'easy', 'eerie', 'equal', 'erect', 'erotic', 'ethic', 'even', 'evil', 'exact', 'exotic', 'faint', 'false', 'famous', 'fatal', 'faulty', 'feeble', 'firm', 'fishy', 'fixed', 'flabby', 'flashy', 'flat', 'fleet', 'flimsy', 'floppy', 'fluent', 'fluid', 'fond', 'foul', 'frail', 'frank', 'free', 'fresh', 'frisky', 'frugal', 'funny', 'fussy', 'futile', 'fuzzy', 'game', 'garish', 'gauche', 'gaudy', 'gawky', 'genial', 'gent', 'glad', 'glib', 'glum', 'grand', 'grave', 'great', 'greedy', 'grimy', 'groggy', 'gross', 'guilty', 'happy', 'hardy', 'harsh', 'hasty', 'hazy', 'heated', 'hectic', 'heroic', 'hoarse', 'honest', 'hot', 'huge', 'humane', 'humble', 'hungry', 'husky', 'icy', 'inept', 'insane', 'ireful', 'ironic', 'jaded', 'jaunty', 'jerky', 'jocose', 'joking', 'jolly', 'jovial', 'joyful', 'juicy', 'just', 'keen', 'lame', 'lavish', 'lax', 'lazy', 'lewd', 'light', 'limp', 'livid', 'logic', 'loose', 'loud', 'loving', 'loyal', 'lubber', 'lucid', 'lucky', 'lurid', 'lusty', 'mad', 'magic', 'manful', 'marked', 'mature', 'meager', 'mean', 'meek', 'menial', 'merry', 'messy', 'metric', 'mighty', 'mild', 'minute', 'miser', 'modest', 'moist', 'moody', 'moral', 'morbid', 'murky', 'music', 'mute', 'naive', 'naked', 'narrow', 'nasty', 'neat', 'nice', 'nimble', 'noble', 'noisy', 'normal', 'nosy', 'numb', 'oafish', 'opaque', 'pert', 'pesky', 'physic', 'pious', 'pithy', 'placid', 'plain', 'poetic', 'polite', 'poor', 'prim', 'prissy', 'proper', 'proud', 'public', 'pure', 'quaint', 'queer', 'quick', 'quiet', 'rabid', 'racy', 'raging', 'rakish', 'random', 'rank', 'rapid', 'rapt', 'rare', 'rash', 'raving', 'ready', 'regal', 'remote', 'rich', 'right', 'rigid', 'ripe', 'ritual', 'robust', 'rosy', 'rough', 'royal', 'rude', 'rueful', 'rugged', 'sad', 'safe', 'sane', 'saucy', 'savage', 'scant', 'secret', 'secure', 'sedate', 'serene', 'severe', 'sexy', 'sexual', 'shaky', 'sharp', 'shoddy', 'showy', 'shrewd', 'shy', 'silent', 'simple', 'skimpy', 'slack', 'sleazy', 'sleek', 'slick', 'slight', 'slow', 'smart', 'smooth', 'smug', 'snooty', 'snug', 'sober', 'soft', 'soggy', 'solemn', 'somber', 'sordid', 'sore', 'sound', 'sour', 'spry', 'square', 'staid', 'stark', 'static', 'steady', 'stern', 'stiff', 'stingy', 'stoic', 'stolid', 'stormy', 'stout', 'strict', 'strong', 'stuffy', 'stupid', 'suave', 'subtle', 'sudden', 'sudden', 'sulky', 'sullen', 'superb', 'supp', 'sure', 'swanky', 'swift', 'tacit', 'tacky', 'tame', 'tardy', 'tart', 'taut', 'tense', 'tepid', 'terse', 'testy', 'thick', 'thin', 'tidy', 'tight', 'timid', 'tonal', 'tough', 'tragic', 'trim', 'trite', 'true', 'trying', 'turgid', 'uneasy', 'unique', 'unkind', 'unsafe', 'urgent', 'useful', 'vague', 'vain', 'vexed', 'visual', 'vital', 'vivid', 'vocal', 'vulgar', 'wan', 'wanton', 'warm', 'weak', 'weird', 'wicked', 'wide', 'wild', 'wise', 'witty', 'woeful', 'wrong', 'wry'
];
const verbed = new Proxy(verbs, {
    get: (arr, prop) => {
        // Check it's not a property
        if (!(prop in [])) {
            return getPastTense(arr[prop])
        } else {
            return arr[prop]
        }
    }
});

var WORDLISTS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  verbs: verbs,
  nouns: nouns,
  adverbs: adverbs,
  interjections: interjections,
  adjectives: adjectives,
  verbed: verbed
});

// import * as WORDLISTS from WORDLIST_URL
console.log(WORDLISTS);
// Extend the LitElement base class
class RandomSentenceGenerator extends LitElement {
    /**
     * Implement `render` to define a template for your element.
     *
     * You must provide an implementation of `render` for any element
     * that uses LitElement as a base class.
     */
    static get properties () {
        return {
            template: {
                type: String,
                attribute: 'template'
            },
            parsedString: {
                type: String
                /*,
                computed: 'parse(template)' */
            },
            fetchedWordlistCount: {
                type: Number,
                value: 0
            },
            capitalize: {
                type: Boolean
            },
            partsOfSpeechMap: {
                type: Object
            },
            templateEntropy: {
                type: Number,
                reflect: true,
                attribute: 'template-entropy'
            },
            maxWordLength: {
                type: Number,
                attribute: 'max-word-length'
            }
        }
    }

    constructor () {
        super();

        // Properties
        this.template = 'adjective noun verb adverb.';
        this.maxWordLength = 0; // disabled
        this.parsedString = '';
        this.fetchedWordlistCount = 0;
        this.capitalize = true;
        this.partsOfSpeechMap = {
            'noun': 'nouns',
            'adverb': 'adverbs',
            'adv': 'adverbs',
            'verb': 'verbs',
            'interjection': 'interjections',
            'adjective': 'adjectives',
            'adj': 'adjectives',
            'verbed': 'verbed'
        };
        this.partsOfSpeech = Object.keys(this.partsOfSpeechMap);
        this._wordlists = WORDLISTS;
    }

    updated (changedProperties) {
        // console.log('changed properties')
        // console.log(changedProperties) // logs previous values
        let regen = false;
        if (changedProperties.has('template')) {
            regen = true;
        }
        if (changedProperties.has('maxWordLength')) {
            console.dir(this.maxWordLength);
            if (this.maxWordLength) {
                const wl = {...this._wordlists};
                for (const partOfSpeech in this._wordlists) {
                    console.log(this._wordlists[partOfSpeech]);
                    if (Array.isArray(this._wordlists[partOfSpeech])) {
                        wl[partOfSpeech] = this._wordlists[partOfSpeech].filter(word => word.length <= this.maxWordLength);
                    }
                }
                this._wordlists = wl;
            }
            regen = true;
        }
        if (regen) this.generate();
        // if (changedProperties.has('templateEntropy')) {
        //     this.
        // }
    }

    _RNG (entropy) {
        if (entropy > 1074) {
            throw new Error('Javascript can not handle that much entropy!')
        }
        let randNum = 0;
        const crypto = window.crypto || window.msCrypto;

        if (crypto) {
            const entropy256 = Math.ceil(entropy / 8);

            let buffer = new Uint8Array(entropy256);
            crypto.getRandomValues(buffer);

            randNum = buffer.reduce((num, value) => {
                return num * value
            }, 1) / Math.pow(256, entropy256);
        } else {
            console.warn('Secure RNG not found. Using Math.random');
            randNum = Math.random();
        }
        return randNum
    }

    setRNG (fn) {
        this._RNG = fn;
    }

    _captitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    getWord (partOfSpeech) {
        const words = this._wordlists[this.partsOfSpeechMap[partOfSpeech]];
        const requiredEntropy = Math.log(words.length) / Math.log(2);
        const index = this._RNG(requiredEntropy) * words.length;

        return {
            word: words[Math.round(index)],
            entropy: words.length
        }
    }

    generate () {
        this.parsedString = this.parse(this.template);
    }

    parse (template) {
        const split = template.split(/[\s]/g);
        let entropy = 1;
        const final = split.map(word => {
            const lower = word.toLowerCase();

            this.partsOfSpeech.some(partOfSpeech => {
                const partOfSpeechIndex = lower.indexOf(partOfSpeech); // Check it exists
                const nextChar = word.charAt(partOfSpeech.length);

                if (partOfSpeechIndex === 0 && !(nextChar && (nextChar.match(/[a-zA-Z]/g) != null))) {
                    const replacement = this.getWord(partOfSpeech);
                    word = replacement.word + word.slice(partOfSpeech.length); // Append the rest of the "word" (punctuation)
                    entropy = entropy * replacement.entropy;
                    return true
                }
            });
            return word
        });
        this.templateEntropy = Math.floor(Math.log(entropy) / Math.log(8));
        // console.log('parsing ' + template)
        return /* this.templateEntropy + ' - ' + */ final.join(' ')
    }

    render () {
        /**
         * `render` must return a lit-html `TemplateResult`.
         *
         * To create a `TemplateResult`, tag a JavaScript template literal
         * with the `html` helper function:
         */
        return html`
            ${this.parsedString}
        `
    }
}
// Register the new element with the browser.
customElements.define('random-sentence-generator', RandomSentenceGenerator);

let lastPassword = '';

class CreateAccountSection extends connect(store)(LitElement) {
    static get properties () {
        return {
            nextHidden: { type: Boolean, notify: true },
            nextDisabled: { type: Boolean, notify: true },
            nextText: { type: String, notify: true },
            backHidden: { type: Boolean, notify: true },
            backDisabled: { type: Boolean, notify: true },
            backText: { type: String, notify: true },
            hideNav: { type: Boolean, notify: true },

            selectedPage: { type: String },
            error: { type: Boolean },
            errorMessage: { type: String },
            nextButtonText: { type: String },
            saveAccount: { type: Boolean },
            createAccountLoading: { type: Boolean },
            hasSavedSeedphrase: { type: Boolean }
        }
    }

    static get styles () {
        return [
            css`

            `
        ]
    }

    constructor () {
        super();
        this.nextText = 'Next';
        this.backText = 'Back';
        this.nextDisabled = true;

        this.selectedPage = 'info';
        this.nextButtonText = 'Next';
        this.saveAccount = true;
        this.hasSavedSeedphrase = false;
        this.createAccountLoading = false;
        const welcomeMessage = 'Welcome to Qortal';
        this.welcomeMessage = welcomeMessage;

        this.pages = {
            info: {
                next: e => {
                    this.error = false;
                    this.errorMessage = '';
                    // const randSeedPhrase = this.shadowRoot.getElementById('randSentence').parsedString
                    // const seedPhrase = this.shadowRoot.getElementById('seedPhrase').value
                    // console.log(randSeedPhrase, seedPhrase)
                    if (!this.hasSavedSeedphrase) {
                        this.error = true;
                        this.errorMessage = 'Please save your seedphrase!';
                        return
                    }

                    this.nextButtonText = 'Create';
                    this.selectPage('password');
                    this.updateNext();
                },
                back: () => {
                    this.navigate('welcome');
                }
            },
            password: {
                next: e => {
                    // Create account and login :)
                    this.createAccountLoading = true;
                    const password = this.shadowRoot.getElementById('password').value;
                    console.log(this.shadowRoot.getElementById('password'));

                    if (this.saveAccount) {
                        if (password === '') {
                            snackbar.add({
                                labelText: 'Please enter a password',
                                dismiss: true
                            });
                            return
                        }

                        if (password.length < 8 && lastPassword !== password) {
                            snackbar.add({
                                labelText: 'Your password is less than 8 characters! This is not recommended. You can press login again to ignore this warning.',
                                dismiss: true
                            });
                            lastPassword = password;
                            return
                        }
                    }

                    const seedPhrase = this.shadowRoot.getElementById('randSentence').parsedString;

                    // this.loadingRipple.welcomeMessage = welcomeMessage + ', ' + username
                    ripple.welcomeMessage = welcomeMessage;

                    // this.loadingRipple.open({
                    ripple.open({
                        x: e.clientX,
                        y: e.clientY
                    })
                        .then(() => createWallet('phrase', seedPhrase, status => {
                            // this.loadingRipple.loadingMessage = status
                            ripple.loadingMessage = status;
                        }))
                        .then(wallet => {
                            // .then(() => store.dispatch(doLogin('phrase', seedPhrase, status => {
                            //     this.loadingRipple.loadingMessage = status
                            // })))
                            // Get airdrop here ninja
                            // Do the callbacks here so that I can return the wallet again at the end of it

                            store.dispatch(doLogin(wallet));
                            store.dispatch(doSelectAddress(wallet.addresses[0]));
                            this.navigate('show-address');
                            // return this.loadingRipple.fade()
                            return ripple.fade()
                            // Save account after user is logged in...for good UX
                                .then(() => {
                                    console.log(this, this.saveAccount);
                                    if (!this.saveAccount) return
                                    return store.dispatch(doStoreWallet(wallet, password, '' /* username */, () => {
                                        // console.log('STATUS UPDATE <3')
                                        // this.loadingRipple.loadingMessage = status
                                        ripple.loadingMessage = status;
                                    })).catch(err => console.error(err))
                                    // ^^ Don't want this one to break logging
                                })
                        })
                        .then(() => this.cleanup())
                        .catch(e => {
                            snackbar.add({
                                labelText: e,
                                dismiss: true
                            });
                            // this.error = true
                            // this.errorMessage = e
                            console.error('== Error == \n', e);
                            store.dispatch(doLogout());
                            // this.loadingRipple.close()
                            ripple.close();
                        });
                },
                back: () => {
                    this.selectPage('info');
                    this.updateNext();
                }
            }
        };
        this.pageIndexes = {
            info: 0,
            password: 1
        };

        this.nextEnabled = false;
        this.prevEnabled = false;
    }

    cleanup () { // Practically the constructor...what a waste
        this.shadowRoot.getElementById('randSentence').generate();
        this.shadowRoot.getElementById('password').value = '';
        this.hasSavedSeedphrase = false;
        this.selectPage('info');
        this.error = false;
        this.errorMessage = '';
        this.nextButtonText = 'Next';
        this.createAccountLoading = false;
        this.saveAccount = true;
    }

    render () {
        return html`
            <style>
                div[hidden] {
                    display:none !important; 
                }
                .flex {
                    display: flex;
                }
                .flex.column {
                    flex-direction: column;
                }
                #createAccountSection {
                    max-height: calc(var(--window-height) - 56px);
                    max-width: 440px;
                    /* max-height: 500px; */
                    max-height:calc(100% - 100px);
                    padding: 0 12px;
                    overflow-y:auto;
                }
                #createAccountPages {
                    flex-shrink:1;
                    text-align: left;
                    /* overflow:auto; */
                    left:0;
                }
                #createAccountPages [page] {
                    flex-shrink:1;
                }
                /* #tosContent { */
                /* .section-content {
                    padding:0 24px;
                    padding-bottom:0;
                    overflow:auto;
                    flex-shrink:1;
                    max-height: calc(100vh - 296px);
                    
                } */

                mwc-checkbox::shadow .mdc-checkbox::after, mwc-checkbox::shadow .mdc-checkbox::before {
                    background-color:var(--mdc-theme-primary)
                }
                @media only screen and (max-width: ${getComputedStyle(document.body).getPropertyValue('--layout-breakpoint-tablet')}) {
                    /* Mobile */
                    #createAccountSection {
                        /* max-height: calc(var(--window-height) - 204px); */
                        /* max-height: calc(var(--window-height) - 38px); */
                        /* height: calc(var(--window-height) - 38px); */
                        /* max-width:var(--layout-breakpoint-tablet); */
                        max-width: 100%;
                        /* height:100%; */
                        height: calc(var(--window-height) - 56px);
                    }
                    #infoContent{
                        height:auto;
                        min-height: calc(var(--window-height) - 96px)
                    }
                    #nav {
                        flex-shrink:0;
                        padding-top:8px;
                    }
                }

                #infoContent p {
                    text-align: justify;
                }
                @keyframes fade {
                    from {
                        opacity: 0;
                        /* transform: translateX(-20%) */
                    }
                    to {
                        opacity: 1;
                        /* transform: translateX(0) */
                    }
                }
                iron-pages .animated {
                    animation-duration: 0.6s;
                    animation-name: fade;
                }

                paper-input {
                    --paper-input-container-input-color: var(--mdc-theme-on-surface);
                }

                paper-icon-button {
                    --paper-icon-button-ink-color: var(--mdc-theme-primary);
                }
            </style>
            
            <div id="createAccountSection" class="flex column">
                <iron-pages selected="${this.selectedPage}" attr-for-selected="page" id="createAccountPages">
                    <div page="info">
                        <div id="infoContent" class="section-content" style="">
                            <br>
                            <!-- <p style="margin-bottom:0;">
                                Below is a randomly generated seedphrase. You can regenerate it until you find one that you like. Please write it down and/or memorise it. You will need it in order to login to your account.
                            </p> -->
                            <h3 style="text-align:center; margin-top: 0; font-weight: 100; font-family: 'Roboto Mono', monospace;">Create account</h3>
                            <p>
                                Welcome to QORT, you will find it to be similar to that of an RPG game, you, as a minter on the QORT network (if you choose to become one) will have the chance to level your account up, giving you both more of the QORT block reward and also larger influence over the network in terms of voting on decisions for the platform. 
                            </p>
                            <p style="margin-bottom:0;">
                                The first step, is to create your QORT account! Below, you will see a randomly generated ‘seedphrase’. This phrase is used as your private key generator for your blockchain account in QORT. Please write this phrase down and save it somewhere safe. This is extremely important information for your QORT account.
                            </p>

                            <!-- border-bottom: 2px solid var(--mdc-theme-primary); border-top: 2px solid var(--mdc-theme-primary); -->
                            <div style="border-radius: 4px; padding-top: 8px; background: rgba(3,169,244,0.1); margin-top: 24px;">
                                <div style="display: inline-block; padding:12px; width:calc(100% - 84px);">
                                    <random-sentence-generator
                                        template="adverb verb the adjective noun and verb the adjective noun with the adjective noun"
                                        id="randSentence"></random-sentence-generator>
                                </div>
                                        <!--
                                            --- --- --- --- --- --- --- --- --- --- --- -
                                            Calculations
                                            --- --- --- --- --- --- --- --- --- --- --- -
                                            403 adjectives
                                            60 interjections
                                            243 adverbs
                                            2353 nouns
                                            3387 verbs
                                            --- --- --- --- --- --- --- --- --- --- --- -
                                            sooo 243*3387*403*2353*3387*403*2353*403*2353 ~ 2^92
                                            --- --- --- --- --- --- --- --- --- --- --- -
                                            -->
                                <paper-icon-button
                                    icon="icons:autorenew"
                                    style="top:-12px; margin:8px;"
                                    @click=${() => this.shadowRoot.getElementById('randSentence').generate()}
                                ></paper-icon-button>
                            </div>
                             <!-- <div style="display:flex;">
                                <mwc-icon style="padding: 20px; padding-left:0; padding-top: 26px;">lock</mwc-icon>
                                <paper-input style="width:100%;" id="seedPhrase" always-float-labell label="Repeat seed phrase"></paper-input>
                            </div> -->
                        </div>
                        <div style="text-align:right; vertical-align: top; line-height: 40px; margin:0;">
                            <label
                                for="hasSavedSeedphraseCheckbox"
                                @click=${() => this.shadowRoot.getElementById('hasSavedSeedphraseCheckbox').click()}
                                >I have saved my seedphrase</label>
                                <mwc-checkbox id="hasSavedSeedphraseCheckbox" @click=${e => { this.hasSavedSeedphrase = !e.target.checked; this.updateNext(); }} ?checked=${this.hasSavedSeedphrase}></mwc-checkbox>
                        </div>
                    </div>

                    <div page="password">
                        <div id="saveContent" class="section-content">
                            <h3>Save in browser</h3>
                            <p style="text-align: justify;">Your account is now ready to be created. It will be saved in this browser. If you do not want your new account to be saved in your browser you can uncheck the box below. You will still be able to login with your new account(after logging out), you'll just have to retype your seedphrase.</p>
                            <div style="display:flex;" ?hidden=${!this.saveAccount}>
                                <mwc-icon style="padding: 20px; padding-left:0; padding-top: 28px;">vpn_key</mwc-icon>
                                <paper-input style="width:100%;" label="Password" id="password" type="password"></paper-input>
                            </div>
                            <div style="text-align:right; vertical-align: top; line-height: 40px; margin:0;">
                                <label
                                    for="saveInBrowserCheckbox"
                                    @click=${() => this.shadowRoot.getElementById('saveInBrowserCheckbox').click()}
                                    >Save in this browserrrr</label>
                                    <mwc-checkbox id="saveInBrowserCheckbox" @click=${e => { this.saveAccount = !e.target.checked; }} ?checked=${this.saveAccount}></mwc-checkbox>
                            </div>
                        </div>
                    </div>
                </iron-pages>
            </div>
        `
    }

    _pageChange (newPage, oldPage) {
        if (!this.shadowRoot.querySelector('#createAccountPages') || !newPage) {
            return
        }
        const pages = this.shadowRoot.querySelector('#createAccountPages').children;
        // Run the animation on the newly selected page
        const newIndex = this.pageIndexes[newPage];
        if (!pages[newIndex].className.includes('animated')) {
            pages[newIndex].className += ' animated';
        }

        if (typeof oldPage !== 'undefined') {
            const oldIndex = this.pageIndexes[oldPage];
            // Stop the animation of hidden pages
            // pages[oldIndex].className = pages[oldIndex].className.split(' animated').join('');
            pages[oldIndex].classList.remove('animated');
        }
    }

    selectPage (newPage) {
        const oldPage = this.selectedPage;
        this.selectedPage = newPage;
        this._pageChange(newPage, oldPage);
    }

    updateNext () {
        if (this.selectedPage === 'info') {
            this.nextText = 'Next';
            this.nextDisabled = !this.hasSavedSeedphrase;
        } else if (this.selectPage ==='password') {
            this.nextDisabled = false;
            this.nextText = 'Create account';
        }

        this.updatedProperty();
    }

    back (e) {
        this.pages[this.selectedPage].back(e);
    }

    next (e) {
        this.pages[this.selectedPage].next(e);
        // if (this.selectedPage === 'info') {
        //     this.selectPage('password')
        // }
    }

    updatedProperty () {
        this.dispatchEvent(new CustomEvent('updatedProperty', {
            detail: {},
            bubbles: true,
            composed: true
        }));
    }

    navigate (page) {
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: { page },
            bubbles: true,
            composed: true
        }));
    }

    stateChanged (state) {
        // this.loggedIn = state.app.loggedIn
    }

    createAccount () {

    }
}

window.customElements.define('create-account-section', CreateAccountSection);
//# sourceMappingURL=create-account-section.js.map