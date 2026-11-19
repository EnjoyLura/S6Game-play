System.register("chunks:///_virtual/Adventure.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SecondEditionUI.ts', './BattleView.ts', './ScreenLayout.ts', './DungeonPage.ts', './ModalView.ts', './RecruitPage.ts', './GearView.ts', './SquadBattleModel.ts', './LocalSave.ts', './HeroPage.ts', './BagPage.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, sys, profiler, view, ResolutionPolicy, Node, Camera, Color, Layers, UITransform, Canvas, game, Game, resources, Texture2D, Label, Component, SecondEditionUI, BattleView, fitScreen, DungeonPage, setModalSkin, modalText, ModalView, modalRow, modalSection, modalButton, RecruitPage, gearTile, SquadBattleModel, foregroundRewardDelta, gearName, HERO_CONFIG, LocalSave, HeroPage, BagPage;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sys = module.sys;
      profiler = module.profiler;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
      Node = module.Node;
      Camera = module.Camera;
      Color = module.Color;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Canvas = module.Canvas;
      game = module.game;
      Game = module.Game;
      resources = module.resources;
      Texture2D = module.Texture2D;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      SecondEditionUI = module.SecondEditionUI;
    }, function (module) {
      BattleView = module.BattleView;
    }, function (module) {
      fitScreen = module.fitScreen;
    }, function (module) {
      DungeonPage = module.DungeonPage;
    }, function (module) {
      setModalSkin = module.setModalSkin;
      modalText = module.modalText;
      ModalView = module.ModalView;
      modalRow = module.modalRow;
      modalSection = module.modalSection;
      modalButton = module.modalButton;
    }, function (module) {
      RecruitPage = module.RecruitPage;
    }, function (module) {
      gearTile = module.gearTile;
    }, function (module) {
      SquadBattleModel = module.SquadBattleModel;
      foregroundRewardDelta = module.foregroundRewardDelta;
      gearName = module.gearName;
      HERO_CONFIG = module.HERO_CONFIG;
    }, function (module) {
      LocalSave = module.LocalSave;
    }, function (module) {
      HeroPage = module.HeroPage;
    }, function (module) {
      BagPage = module.BagPage;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "fa134vCkXpMPbg3mmIQB+Yo", "Adventure", undefined);
      var ccclass = _decorator.ccclass;
      var Adventure = exports('Adventure', (_dec = ccclass('Adventure'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Adventure, _Component);
        function Adventure() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.second = null;
          _this.secondForest = null;
          _this.screenCamera = void 0;
          _this.root = void 0;
          _this.model = new SquadBattleModel(0, Math.random, 3, true);
          _this.ready = false;
          _this.battleArt = void 0;
          _this.shownFormation = '';
          _this.view = void 0;
          _this.foregroundPaused = false;
          _this.ui = void 0;
          _this.heroTextures = [];
          _this.monsters = void 0;
          _this.dungeonPage = void 0;
          _this.recruitPage = void 0;
          _this.heroPage = void 0;
          _this.bagPage = void 0;
          _this.currentPage = 'adventure';
          _this.canvasRoot = void 0;
          _this.saves = void 0;
          _this.saveClock = 0;
          _this.background = false;
          _this.saveProgress = function () {
            var _this$dungeonPage;
            if (!_this.saves) return false;
            (_this$dungeonPage = _this.dungeonPage) == null || _this$dungeonPage.beforeSave();
            _this.model.refreshDungeon(Date.now());
            if (!_this.background) _this.model.markSeen(Date.now());
            var snapshot = _this.model.snapshot();
            if (_this.background) snapshot.paused = _this.foregroundPaused;
            var ok = _this.saves.save(snapshot);
            if (!ok) _this.toast(_this.saves.error);
            return ok;
          };
          _this.upgradeHero = function (i) {
            var before = _this.model.snapshot();
            var error = _this.model.upgrade(i);
            if (error) return error;
            if (!_this.saveProgress()) {
              _this.model = SquadBattleModel.restore(before);
              return _this.saves.error + '，本次升级未扣经验';
            }
            return null;
          };
          _this.mutateEquipment = function (fn) {
            var _this$view;
            var before = _this.model.snapshot();
            var error = fn(_this.model);
            if (error) return error;
            if (!_this.saveProgress()) {
              _this.model = SquadBattleModel.restore(before);
              return _this.saves.error + '，本次操作已撤销';
            }
            (_this$view = _this.view) == null || _this$view.resetFeedback();
            return null;
          };
          _this.offlineModal = null;
          return _this;
        }
        var _proto = Adventure.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          this.saves = new LocalSave(sys.localStorage, SquadBattleModel.restore);
          this.model = this.saves.load() || this.model;
          this.model.prepareOffline(Date.now());
          this.saveProgress();
          if (typeof window !== 'undefined') window.addEventListener('beforeunload', this.saveProgress);
          profiler.hideStats();
          view.setDesignResolutionSize(887, 1774, ResolutionPolicy.FIXED_WIDTH);
          var cameraNode = new Node('UI Camera');
          cameraNode.parent = this.node;
          cameraNode.setPosition(443.5, 887, 1000);
          var camera = cameraNode.addComponent(Camera);
          this.screenCamera = camera;
          camera.projection = Camera.ProjectionType.ORTHO;
          camera.orthoHeight = 887;
          camera.clearColor = new Color(31, 46, 37, 255);
          camera.visibility = Layers.Enum.UI_2D;
          this.root = new Node('Adventure Canvas');
          this.root.layer = Layers.Enum.UI_2D;
          this.root.parent = this.node;
          this.root.addComponent(UITransform).setContentSize(887, 1774);
          this.root.setPosition(443.5, 887, 0);
          var canvas = this.root.addComponent(Canvas);
          canvas.cameraComponent = camera;
          this.canvasRoot = this.root;
          game.on(Game.EVENT_HIDE, this.hide, this);
          game.on(Game.EVENT_SHOW, this.show, this);
          Promise.all(['forest', 'hero-knight', 'hero-mage', 'hero-priest', 'hero-archer', 'monsters-4', 'adventure-ui-v5', 'hero-ui-v6', 'training-yard', 'bag-ui-v4', 'recruit-ui-v1', 'modal-skin-v1', 'modal-controls-9', 'dungeon-ui-v2', 'v2-backgrounds', 'v2-controls', 'v2-icons', 'v2-navigation', 'v2-skills', 'v2-feature-scenes'].map(function (n) {
            return _this2.texture('art/' + n);
          })).then(function (_ref) {
            var forest = _ref[0],
              knight = _ref[1],
              mage = _ref[2],
              priest = _ref[3],
              archer = _ref[4],
              monsters = _ref[5],
              ui = _ref[6],
              heroUI = _ref[7],
              yard = _ref[8],
              bagUI = _ref[9],
              recruitUI = _ref[10],
              modalSkin = _ref[11],
              modalControls = _ref[12],
              dungeonUI = _ref[13],
              v2Backgrounds = _ref[14],
              v2Controls = _ref[15],
              v2Icons = _ref[16],
              v2Adventure = _ref[17],
              v2Skills = _ref[18],
              v2Features = _ref[19];
            setModalSkin(modalSkin, modalControls);
            _this2.ui = ui;
            _this2.heroTextures = [knight, mage, priest, archer];
            _this2.monsters = monsters;
            _this2.battleArt = [forest, heroUI, bagUI];
            _this2.rebuildBattle();
            _this2.heroPage = new HeroPage(_this2.canvasRoot, heroUI, yard, knight, function () {
              return _this2.openPage('adventure');
            }, function (slot, hero) {
              _this2.openPage('bag');
              if (slot !== undefined) _this2.bagPage.showSlot(slot, hero);
            }, _this2.heroTextures, ui, function () {
              return {
                gold: _this2.model.gold,
                experience: _this2.model.heroes.map(function (h) {
                  return h.experience;
                }),
                levels: _this2.model.heroes.map(function (h) {
                  return h.level;
                }),
                stats: _this2.model.heroes.map(function (_, i) {
                  return _this2.model.stats(i);
                })
              };
            }, _this2.upgradeHero, function () {
              return _this2.model;
            }, _this2.mutateEquipment, bagUI, function () {
              return _this2.openPage('recruit');
            }, function () {
              return _this2.openPage('dungeon');
            });
            _this2.bagPage = new BagPage(_this2.canvasRoot, bagUI, yard, function (page) {
              return _this2.openPage(page);
            }, function () {
              return _this2.model;
            }, _this2.mutateEquipment, heroUI);
            _this2.recruitPage = new RecruitPage(_this2.canvasRoot, recruitUI, heroUI, bagUI, function (page) {
              return _this2.openPage(page);
            }, function () {
              return _this2.model;
            }, _this2.mutateEquipment, _this2.heroTextures);
            _this2.dungeonPage = new DungeonPage(_this2.canvasRoot, dungeonUI, heroUI, bagUI, _this2.heroTextures, _this2.monsters, yard, function (page) {
              return _this2.openPage(page);
            }, function () {
              return _this2.model;
            }, _this2.mutateEquipment, {
              forest: forest,
              ui: ui,
              nav: heroUI,
              bag: bagUI,
              heroes: _this2.heroTextures,
              monsters: monsters
            }, _this2.saveProgress);
            if (typeof document !== 'undefined') {
              _this2.secondForest = v2Backgrounds;
              _this2.dungeonPage.externalUI = true;
              _this2.dungeonPage.externalForest = v2Backgrounds;
              _this2.view.useExternalPresentation(v2Backgrounds);
              _this2.screenCamera.clearColor = new Color(0, 0, 0, 0);
              _this2.second = new SecondEditionUI({
                model: function model() {
                  return _this2.model;
                },
                mutate: _this2.mutateEquipment,
                navigate: function navigate(p) {
                  return _this2.openPage(p);
                },
                battle: function battle() {
                  return _this2.currentPage === 'dungeon' && _this2.dungeonPage.activeBattle || _this2.model;
                },
                speed: function speed() {
                  var _this2$dungeonPage$ac;
                  return _this2.currentPage === 'dungeon' ? ((_this2$dungeonPage$ac = _this2.dungeonPage.activeView) == null ? void 0 : _this2$dungeonPage$ac.getSpeed()) || 1 : _this2.view.getSpeed();
                },
                setSpeed: function setSpeed() {
                  var _ref2;
                  (_ref2 = _this2.currentPage === 'dungeon' ? _this2.dungeonPage.activeView : _this2.view) == null || _ref2.cycleSpeed();
                },
                start: function start(id, d) {
                  var _this2$second;
                  var error = _this2.dungeonPage.startExternal(id, d);
                  if (error) (_this2$second = _this2.second) == null || _this2$second.toast(error);
                },
                resume: function resume() {
                  return _this2.dungeonPage.resumeExternal();
                },
                leave: function leave() {
                  return _this2.dungeonPage.leaveExternal();
                },
                end: function end() {
                  return _this2.dungeonPage.endExternal();
                },
                retry: function retry() {
                  var _this2$second2;
                  var e = _this2.dungeonPage.retryExternal();
                  if (e) (_this2$second2 = _this2.second) == null || _this2$second2.toast(e);
                },
                exit: function exit() {
                  var _this2$second3;
                  var e = _this2.dungeonPage.exitExternal();
                  if (e) (_this2$second3 = _this2.second) == null || _this2$second3.toast(e);
                },
                formation: function formation(ids) {
                  return _this2.currentPage === 'dungeon' && _this2.dungeonPage.activeBattle ? _this2.dungeonPage.formationExternal(ids) : _this2.mutateEquipment(function (m) {
                    return m.setFormation(ids);
                  });
                }
              }, {
                'monsters-4': monsters,
                'v2-skills': v2Skills,
                'v2-backgrounds': v2Backgrounds,
                'v2-controls': v2Controls,
                'v2-icons': v2Icons,
                'v2-navigation': v2Adventure,
                'dungeon-ui-v2': dungeonUI,
                'hero-knight': knight,
                'hero-mage': mage,
                'hero-priest': priest,
                'hero-archer': archer,
                'modal-controls-9': modalControls,
                'v2-feature-scenes': v2Features
              });
            }
            if (_this2.model.dungeon.run) _this2.openPage('dungeon');
            _this2.showOffline();
          })["catch"](function (e) {
            console.error(e);
            modalText(_this2.canvasRoot, '素材加载失败，请刷新重试', 0, 0, 700, 70, 34);
          });
        };
        _proto.rebuildBattle = function rebuildBattle() {
          var _this$view2,
            _this3 = this;
          (_this$view2 = this.view) == null || _this$view2.destroy();
          this.shownFormation = this.model.formation.join();
          this.view = new BattleView(this.canvasRoot, function () {
            return _this3.model;
          }, {
            forest: this.battleArt[0],
            ui: this.ui,
            nav: this.battleArt[1],
            bag: this.battleArt[2],
            heroes: this.heroTextures,
            monsters: this.monsters
          }, {
            title: '镇外森林',
            onChange: this.saveProgress,
            onIncome: function onIncome() {
              return _this3.showOffline();
            },
            onFormation: function onFormation() {
              return _this3.openPage('hero');
            },
            navigate: function navigate(i) {
              return _this3.openPage(['hero', 'recruit', 'adventure', 'bag', 'dungeon'][i]);
            },
            onRestart: function onRestart(index) {
              return _this3.restart(index);
            }
          });
          this.root = this.view.root;
          if (this.second) this.view.useExternalPresentation(this.secondForest || undefined);
          this.ready = true;
          if (this.saves.error) this.toast(this.saves.error);
        };
        _proto.texture = function texture(path) {
          return new Promise(function (resolve, reject) {
            return resources.load(path + '/texture', Texture2D, function (e, t) {
              return e ? reject(e) : resolve(t);
            });
          });
        };
        _proto.toast = function toast(s) {
          var _this$view3;
          (_this$view3 = this.view) == null || _this$view3.toast(s);
        };
        _proto.restart = function restart(index) {
          if (index === void 0) {
            index = this.model.monsterIndex;
          }
          var previous = this.model;
          this.model = new SquadBattleModel(index, Math.random, 3, true);
          this.model.inheritIncome(previous);
          this.model.autoSkill = previous.autoSkill;
          this.rebuildBattle();
          this.saveProgress();
        };
        _proto.openPage = function openPage(page) {
          if (!this.heroPage || !this.bagPage || !this.recruitPage) return;
          if (this.currentPage === 'dungeon') this.dungeonPage.beforeSave();
          this.currentPage = page;
          if (page === 'dungeon') this.dungeonPage.refresh();
          if (page === 'adventure' && this.shownFormation !== this.model.formation.join()) this.rebuildBattle();
          this.view.resetFeedback();
          if (page === 'hero') this.heroPage.refresh();
          if (page === 'bag') {
            this.bagPage.setGold(this.model.gold);
            this.bagPage.refresh();
          }
          this.root.active = page === 'adventure';
          this.heroPage.node.active = page === 'hero';
          this.bagPage.node.active = page === 'bag';
          this.recruitPage.node.active = page === 'recruit';
          this.dungeonPage.node.active = page === 'dungeon';
          if (this.second) {
            this.heroPage.node.active = false;
            this.bagPage.node.active = false;
            this.recruitPage.node.active = false;
            this.second.setPage(page);
          }
        };
        _proto.update = function update(dt) {
          if (!this.ready || this.background) return;
          fitScreen(this.canvasRoot, this.screenCamera);
          this.model.refreshDungeon(Date.now());
          var nextId = this.model.nextGearId,
            oldCount = this.model.inventory.length,
            oldMaterials = this.model.materials;
          this.model.settleIdle(foregroundRewardDelta(dt));
          if (this.model.nextGearId > nextId) {
            var saved = this.saveProgress(),
              kept = this.model.inventory.length - oldCount,
              recycled = this.model.nextGearId - nextId - kept;
            if (this.currentPage === 'bag') this.bagPage.refresh();
            if (this.currentPage === 'adventure') this.toast(!saved ? this.saves.error : recycled ? '自动分解 ' + recycled + ' 件 · 强化石 +' + (this.model.materials - oldMaterials) + (kept ? ' · 保留 ' + kept + ' 件' : '') : '获得 ' + gearName(this.model.inventory[this.model.inventory.length - 1]) + ' · 已进入背包');
          }
          this.saveClock += dt;
          if (this.saveClock >= 1) {
            this.saveClock = 0;
            this.saveProgress();
          }
          if (this.second) {
            if (!this.second.blocksBattle) {
              if (this.currentPage === 'dungeon') this.dungeonPage.update(dt);else if (this.currentPage === 'adventure') this.view.update(dt);
            }
            this.second.update();
            return;
          }
          if (this.currentPage === 'dungeon') {
            this.dungeonPage.update(dt);
            return;
          }
          if (this.currentPage === 'recruit') return;
          if (this.currentPage === 'hero') {
            this.heroPage.refreshIncome();
            return;
          }
          if (this.currentPage === 'bag') {
            this.bagPage.setGold(this.model.gold);
            return;
          }
          this.view.update(dt);
        };
        _proto.showOffline = function showOffline() {
          var _this4 = this;
          if (this.second) {
            this.second.update();
            return;
          }
          if (!this.ready || !this.canvasRoot || this.offlineModal) return;
          var r = this.model.offline;
          if (!r) return;
          var close = function close() {
            var _this4$offlineModal;
            (_this4$offlineModal = _this4.offlineModal) == null || _this4$offlineModal.destroy();
            _this4.offlineModal = null;
          };
          var view = new ModalView(this.canvasRoot, '离线收益', 1320, close);
          this.offlineModal = view.layer;
          var card = view.card;
          modalRow(card, '◷', '离线时长', r.seconds + '秒', 395);
          modalRow(card, '⚑', '最高检查点', String(r.checkpoint), 333);
          modalRow(card, '●', '金币', '+' + r.gold, 250);
          r.experience.forEach(function (v, i) {
            if (v) modalRow(card, '✦', HERO_CONFIG[i].name + '经验', '+' + v, 175 - i * 62);
          });
          modalSection(card, '装备 ' + r.equipment.length + '件', -110);
          r.equipment.slice(0, 5).forEach(function (g, i) {
            return gearTile(card, _this4.battleArt[2], g, g.slot, -280 + i * 140, -210, 125);
          });
          modalText(card, '离线收益上限8小时，按最高进度结算。\n领取时应用自动保留规则，其余装备分解。\n未领取可关闭，点击“收益”再次查看。', 0, -350, 690, 130, 25);
          var claim = modalButton(card, '领取收益', 0, -530, 440, 82, function () {
            var error = _this4.mutateEquipment(function (b) {
              return b.claimOffline();
            });
            if (error) {
              message.string = error;
              return;
            }
            close();
            if (_this4.currentPage === 'bag') _this4.bagPage.refresh();
            if (_this4.currentPage === 'hero') _this4.heroPage.refresh();
            _this4.toast('离线收益已领取并保存');
          });
          var message = claim.children[claim.children.length - 1].getComponent(Label);
        };
        _proto.hide = function hide() {
          if (this.background) return;
          this.saveProgress();
          this.foregroundPaused = this.model.paused;
          this.background = true;
          this.model.paused = true;
        };
        _proto.show = function show() {
          if (!this.background) return;
          this.background = false;
          this.model.paused = this.foregroundPaused;
          this.model.prepareOffline(Date.now());
          this.saveProgress();
          this.showOffline();
        };
        _proto.onDestroy = function onDestroy() {
          var _this$second;
          (_this$second = this.second) == null || _this$second.destroy();
          if (typeof window !== 'undefined') window.removeEventListener('beforeunload', this.saveProgress);
          game.off(Game.EVENT_HIDE, this.hide, this);
          game.off(Game.EVENT_SHOW, this.show, this);
        };
        return Adventure;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BagPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EquipmentModal.ts', './ModalView.ts', './SquadBattleModel.ts', './GearView.ts'], function (exports) {
  var _extends, cclegacy, Node, Layers, UITransform, Graphics, Color, Label, SpriteFrame, Sprite, Rect, Mask, ScrollView, Vec2, equipmentHeader, equipmentStats, inModal, modalButton, modalIcon, ModalView, modalRow, modalSection, modalSelect, HERO_CONFIG, ENHANCE_CAP, gearStats, enhanceCost, QUALITY_NAMES, investedMaterials, gearTile, drawNavigation;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Graphics = module.Graphics;
      Color = module.Color;
      Label = module.Label;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Rect = module.Rect;
      Mask = module.Mask;
      ScrollView = module.ScrollView;
      Vec2 = module.Vec2;
    }, function (module) {
      equipmentHeader = module.equipmentHeader;
      equipmentStats = module.equipmentStats;
    }, function (module) {
      inModal = module.inModal;
      modalButton = module.modalButton;
      modalIcon = module.modalIcon;
      ModalView = module.ModalView;
      modalRow = module.modalRow;
      modalSection = module.modalSection;
      modalSelect = module.modalSelect;
    }, function (module) {
      HERO_CONFIG = module.HERO_CONFIG;
      ENHANCE_CAP = module.ENHANCE_CAP;
      gearStats = module.gearStats;
      enhanceCost = module.enhanceCost;
      QUALITY_NAMES = module.QUALITY_NAMES;
      investedMaterials = module.investedMaterials;
    }, function (module) {
      gearTile = module.gearTile;
      drawNavigation = module.drawNavigation;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6a360QSTkZNm40tDkddpZrz", "BagPage", undefined);
      var INK = '#704124',
        CREAM = '#FFF3E2';
      var PARTS = ['全部', '武器', '戒指', '项链', '头盔', '衣服', '鞋子'];
      var BagPage = exports('BagPage', /*#__PURE__*/function () {
        var _proto = BagPage.prototype;
        _proto.refresh = function refresh() {
          this.save();
          this.render();
          if (this.modal) this.modal.setSiblingIndex(this.node.children.length - 1);
        };
        _proto.showSlot = function showSlot(slot, hero) {
          this.batch = false;
          this.selected.clear();
          this.lockedOnly = false;
          this.targetHero = hero;
          this.category = 0;
          this.part = slot + 1;
          this.savedOffsets[0] = 0;
          this.render();
        };
        function BagPage(parent, atlas, yard, navigate, model, mutate, navAtlas) {
          this.node = void 0;
          this.content = void 0;
          this.modal = null;
          this.category = 0;
          this.part = 0;
          this.sort = 0;
          this.lockedOnly = false;
          this.scroll = void 0;
          this.thumb = void 0;
          this.savedOffsets = [0, 0, 0];
          this.targetHero = 0;
          this.batch = false;
          this.selected = new Set();
          this.batchIds = [];
          this.gold = 0;
          this.goldLabel = void 0;
          this.atlas = atlas;
          this.yard = yard;
          this.navigate = navigate;
          this.model = model;
          this.mutate = mutate;
          this.navAtlas = navAtlas;
          this.node = this.base(parent, 'Bag page', 0, 0, 887, 1774);
          this.render();
          this.node.active = false;
        }
        _proto.base = function base(parent, name, x, y, w, h) {
          var n = new Node(name);
          n.parent = parent;
          n.layer = Layers.Enum.UI_2D;
          n.setPosition(x, y);
          n.addComponent(UITransform).setContentSize(w, h);
          return n;
        };
        _proto.panel = function panel(parent, x, y, w, h, color, r) {
          if (color === void 0) {
            color = CREAM;
          }
          if (r === void 0) {
            r = 24;
          }
          var n = this.base(parent, 'Panel', x, y, w, h),
            g = n.addComponent(Graphics);
          g.fillColor = new Color().fromHEX(color);
          g.roundRect(-w / 2, -h / 2, w, h, r);
          g.fill();
          return n;
        };
        _proto.text = function text(parent, t, x, y, w, h, size, color) {
          if (size === void 0) {
            size = 28;
          }
          if (color === void 0) {
            color = INK;
          }
          var l = this.base(parent, t, x, y, w, h).addComponent(Label);
          l.string = t;
          l.fontFamily = 'Microsoft YaHei';
          l.isBold = true;
          l.fontSize = size;
          l.lineHeight = size * 1.4;
          l.color = new Color().fromHEX(color);
          l.horizontalAlign = Label.HorizontalAlign.CENTER;
          l.verticalAlign = Label.VerticalAlign.CENTER;
          l.overflow = Label.Overflow.SHRINK;
          return l;
        };
        _proto.image = function image(parent, t, r, x, y, w, h) {
          var n = this.base(parent, 'UI image', x, y, w, h),
            f = new SpriteFrame();
          f.texture = t;
          f.rect = r;
          var s = n.addComponent(Sprite);
          s.sizeMode = Sprite.SizeMode.CUSTOM;
          s.spriteFrame = f;
          n.getComponent(UITransform).setContentSize(w, h);
          return n;
        };
        _proto.cut = function cut(sx, sy, sw, sh, x, y, w, h, parent) {
          if (w === void 0) {
            w = sw;
          }
          if (h === void 0) {
            h = sh;
          }
          if (parent === void 0) {
            parent = this.content;
          }
          return this.image(parent, this.atlas, new Rect(sx, sy, sw, sh), x, y, w, h);
        };
        _proto.button = function button(parent, t, x, y, w, h, fn, active) {
          if (active === void 0) {
            active = false;
          }
          if (inModal(parent)) return modalButton(parent, t, x, y, w, h, fn, active ? 'gold' : 'peach');
          this.panel(parent, x, y - 4, w, h, active ? '#E9A63A' : '#E5C6A4', h / 2);
          var n = this.panel(parent, x, y, w, h, active ? '#FFDA54' : CREAM, h / 2);
          this.text(n, t, 0, 0, w - 12, h - 6, 30);
          n.on(Node.EventType.TOUCH_END, fn);
          return n;
        };
        _proto.detail = function detail(title, body) {
          var p = this.modalCard(title, 820);
          modalIcon(p, 4, 0, 120, 90);
          this.text(p, body, 0, -80, 660, 260, 28);
        };
        _proto.equipmentDetail = function equipmentDetail(id) {
          var _this = this;
          var b = this.model(),
            g = b.inventory.find(function (g) {
              return g.id === id;
            });
          if (!g) return;
          var p = this.modalCard('装备详情', 1280),
            owner = b.owner(id);
          var run = function run(fn) {
            var error = _this.mutate(fn);
            if (error) {
              _this.detail('装备操作', error);
              return;
            }
            _this.refresh();
            _this.equipmentDetail(id);
          };
          equipmentHeader(p, this.atlas, g, 380, function () {
            return run(function (b) {
              return b.toggleLock(id);
            });
          });
          equipmentStats(p, g, 250);
          var current = b.equipment(this.targetHero)[g.slot];
          var diff = function diff(key) {
            var d = gearStats(g)[key] - (current ? gearStats(current)[key] : 0);
            return (d >= 0 ? '+' : '') + d;
          };
          this.text(p, '替换变化：生命 ' + diff('hp') + ' · 攻击 ' + diff('attack') + '\n防御 ' + diff('defense') + ' · 技能效果 ' + diff('power'), 0, -112, 690, 90, 26);
          this.text(p, owner >= 0 ? '穿戴中：' + HERO_CONFIG[owner].name : '未穿戴 · 选择穿戴英雄', 0, -186, 690, 44, 26);
          HERO_CONFIG.forEach(function (h, i) {
            return _this.button(p, h.name, -264 + i * 176, -248, 166, 58, function () {
              _this.targetHero = i;
              _this.equipmentDetail(id);
            }, _this.targetHero === i);
          });
          var capped = (g.enhancement || 0) >= ENHANCE_CAP;
          this.text(p, '强化石 ' + b.materials + ' · 当前 +' + (g.enhancement || 0) + ' / +' + ENHANCE_CAP, 0, -365, 690, 45, 26);
          this.button(p, capped ? '已满级' : '强化', -174, -490, 295, 76, function () {
            return _this.enhancementDetail(id);
          }, !capped);
          this.button(p, owner === this.targetHero ? '卸下' : '穿戴给' + HERO_CONFIG[this.targetHero].name, 174, -490, 310, 76, function () {
            return run(function (b) {
              return b.equip(_this.targetHero, owner === _this.targetHero ? null : id, g.slot);
            });
          }, true);
        };
        _proto.modalCard = function modalCard(title, height) {
          var _this2 = this;
          if (height === void 0) {
            height = 1000;
          }
          this.closeModal();
          var view = new ModalView(this.node, title, height, function () {
            return _this2.closeModal();
          });
          this.modal = view.layer;
          return view.card;
        };
        _proto.closeModal = function closeModal() {
          var _this$modal;
          (_this$modal = this.modal) == null || _this$modal.destroy();
          this.modal = null;
        };
        _proto.enhancementDetail = function enhancementDetail(id) {
          var _this3 = this;
          var b = this.model(),
            g = b.inventory.find(function (g) {
              return g.id === id;
            });
          if (!g) return;
          var p = this.modalCard('装备强化', 1140),
            level = g.enhancement || 0,
            capped = level >= ENHANCE_CAP;
          equipmentHeader(p, this.atlas, g, 310);
          this.text(p, '+' + level + '  →  +' + Math.min(ENHANCE_CAP, level + 1), 0, 157, 680, 72, 43);
          var before = gearStats(g),
            after = gearStats(_extends({}, g, {
              enhancement: Math.min(ENHANCE_CAP, level + 1)
            }));
          ['hp', 'attack', 'defense', 'power'].forEach(function (key, i) {
            return modalRow(p, ['♥', '⚔', '◈', '✦'][i], ['生命', '攻击', '防御', '技能效果'][i], before[key] + ' → ' + after[key], 62 - i * 62);
          });
          modalRow(p, '◆', '强化石', b.materials + ' / ' + (capped ? 0 : enhanceCost(g)), -220);
          this.text(p, '每级提升基础词条10%，穿戴中也可强化', 0, -305, 690, 65, 24);
          this.button(p, capped ? '已满级' : '确认强化', 0, -445, 390, 80, function () {
            var error = _this3.mutate(function (b) {
              return b.enhance(id);
            });
            if (error) {
              _this3.detail('强化未完成', error);
              return;
            }
            _this3.refresh();
            _this3.enhancementDetail(id);
          }, !capped);
        };
        _proto.rulesDetail = function rulesDetail(draft) {
          var _this4 = this;
          if (draft === void 0) {
            draft = this.model().rules;
          }
          var r = _extends({}, draft, {
              attributes: draft.attributes.slice()
            }),
            p = this.modalCard('自动保留规则', 1360);
          modalSection(p, '自动分解', 440);
          this.button(p, r.enabled ? '开启 ✓' : '关闭', 220, 440, 190, 62, function () {
            r.enabled = !r.enabled;
            _this4.rulesDetail(r);
          }, r.enabled);
          this.text(p, '满足任一条件就保留，其余新掉落自动分解', 0, 350, 690, 55, 25);
          this.text(p, '品质保留', -215, 260, 240, 55, 29);
          modalSelect(p, r.minQuality === 5 ? '不按品质保留' : QUALITY_NAMES[r.minQuality] + '及以上', 140, 260, 355, [].concat(QUALITY_NAMES.map(function (q) {
            return q + '及以上';
          }), ['不按品质保留']), r.minQuality, function (i) {
            r.minQuality = i;
            _this4.rulesDetail(r);
          });
          this.text(p, '等级保留', -215, 165, 240, 55, 29);
          var levels = [0, 5, 10, 20, 50, 100];
          modalSelect(p, r.minLevel ? r.minLevel + '级及以上' : '不按等级保留', 140, 165, 355, levels.map(function (l) {
            return l ? l + '级及以上' : '不按等级保留';
          }), levels.indexOf(r.minLevel), function (i) {
            r.minLevel = levels[i];
            _this4.rulesDetail(r);
          });
          modalSection(p, '指定属性', 65);
          this.text(p, '含任一选中属性就保留（可多选）', 0, 3, 690, 45, 24);
          ['hp', 'attack', 'defense', 'power'].forEach(function (key, i) {
            var checked = r.attributes.indexOf(key) >= 0,
              n = modalRow(p, ['♥', '⚔', '◈', '✦'][i], ['生命', '攻击', '防御', '技能效果'][i], checked ? '✓' : '□', -65 - i * 62);
            n.on(Node.EventType.TOUCH_END, function () {
              var j = r.attributes.indexOf(key);
              if (j >= 0) r.attributes.splice(j, 1);else r.attributes.push(key);
              _this4.rulesDetail(r);
            });
          });
          this.text(p, '锁定、已穿戴、已强化：始终自动保留。\n保存只影响新掉落，不分解已有装备。', 0, -365, 690, 90, 25);
          this.button(p, '保存规则', 0, -550, 390, 80, function () {
            var error = _this4.mutate(function (b) {
              return b.setRules(r);
            });
            if (error) {
              _this4.detail('规则未保存', error);
              return;
            }
            _this4.refresh();
            _this4.detail('规则已保存', r.enabled ? '新掉落将按规则保留或分解。\n已有装备不会自动处理。' : '自动分解已关闭。\n新掉落全部进入背包。');
          }, true);
        };
        _proto.confirmSalvage = function confirmSalvage() {
          var _this5 = this;
          var ids = Array.from(this.selected),
            preview = this.model().salvagePreview(ids);
          if (preview.error) {
            this.detail('无法分解', preview.error);
            return;
          }
          var p = this.modalCard('批量分解', 1180);
          preview.items.slice(0, 10).forEach(function (g, i) {
            return gearTile(p, _this5.atlas, g, g.slot, -280 + i % 5 * 140, 300 - Math.floor(i / 5) * 140, 126);
          });
          modalRow(p, '▣', '已选择', ids.length + '件装备', 25);
          this.text(p, '锁定和已穿戴的装备不能分解', 0, -47, 680, 55, 27);
          modalSection(p, '分解预览', -130);
          modalRow(p, '◆', '强化石', '+' + preview.materials, -200);
          var refund = preview.items.reduce(function (n, g) {
            return n + investedMaterials(g);
          }, 0);
          this.text(p, (refund ? '含强化投入返还 ' + refund + ' 强化石。\n' : '') + '分解后装备消失，请确认选择。', 0, -285, 680, 90, 25);
          this.button(p, '确认分解', 0, -460, 390, 80, function () {
            var error = _this5.mutate(function (b) {
              return b.salvage(ids);
            });
            if (error) {
              _this5.detail('分解未完成', error);
              return;
            }
            _this5.batch = false;
            _this5.selected.clear();
            _this5.refresh();
            _this5.detail('分解完成', '分解 ' + ids.length + ' 件装备\n获得 ' + preview.materials + ' 强化石\n已保存');
          }, true);
        };
        _proto.filteredItems = function filteredItems() {
          var _this6 = this;
          var b = this.model();
          return b.inventory.filter(function (g) {
            return (!_this6.batch || _this6.batchIds.indexOf(g.id) >= 0) && (_this6.part === 0 || g.slot === _this6.part - 1) && (!_this6.lockedOnly || g.locked);
          });
        };
        _proto.save = function save() {
          if (this.scroll) this.savedOffsets[this.category] = this.scroll.getScrollOffset().y;
        };
        _proto.changeTab = function changeTab(i) {
          if (i === this.category) return;
          this.save();
          this.batch = false;
          this.selected.clear();
          this.category = i;
          this.render();
        };
        _proto.setGold = function setGold(value) {
          this.gold = value;
          if (this.goldLabel) this.goldLabel.string = String(value);
        };
        _proto.render = function render() {
          var _this$content,
            _this7 = this;
          (_this$content = this.content) == null || _this$content.destroy();
          this.content = this.base(this.node, 'Bag content', 0, 0, 887, 1774);
          var p = this.content;
          this.panel(p, 0, 0, 887, 1774, '#F9E4CF', 0);
          this.image(p, this.yard, new Rect(0, 0, this.yard.width, this.yard.height * .38), 0, 790, 887, 194);
          this.cut(20, 16, 155, 65, -345, 837);
          this.panel(p, -140, 837, 185, 62);
          this.cut(201, 19, 56, 56, -205, 837, 54, 54);
          this.goldLabel = this.text(p, String(this.gold), -125, 837, 105, 50, 35);
          ['装备', '材料', '道具'].forEach(function (name, i) {
            return _this7.button(p, name, -292 + i * 292, 687, 282, 76, function () {
              return _this7.changeTab(i);
            }, _this7.category === i);
          });
          if (this.category === 0) PARTS.forEach(function (name, i) {
            return _this7.button(p, name, -354 + i * 118, 595, 110, 55, function () {
              _this7.part = i;
              _this7.selected.clear();
              _this7.savedOffsets[0] = 0;
              _this7.render();
            }, _this7.part === i);
          });else this.text(p, this.category === 1 ? '培养与打造材料' : '可使用的道具', 0, 595, 650, 55, 29, '#AA8060');
          this.button(p, this.batch ? '取消分解' : this.lockedOnly && this.category === 0 ? '仅锁定' : '筛选', -284, 511, 216, 62, function () {
            if (_this7.batch) {
              _this7.batch = false;
              _this7.selected.clear();
              _this7.render();
              return;
            }
            if (_this7.category !== 0) {
              _this7.detail('筛选', '强化石自动堆叠，无需筛选。');
              return;
            }
            _this7.lockedOnly = !_this7.lockedOnly;
            _this7.savedOffsets[0] = 0;
            _this7.render();
          }, this.lockedOnly && this.category === 0);
          this.button(p, ['品质排序', '品质 ↓', '品质 ↑'][this.sort], 278, 511, 232, 62, function () {
            _this7.sort = _this7.sort === 1 ? 2 : 1;
            _this7.savedOffsets[_this7.category] = 0;
            _this7.render();
          });
          this.panel(p, 0, -45, 853, 1038, '#FFF2E3', 30);
          var viewport = this.base(p, 'Vertical inventory', -8, -42, 800, 1000);
          viewport.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
          var list = this.base(viewport, 'Items', 0, 500, 800, 1130);
          list.getComponent(UITransform).setAnchorPoint(.5, 1);
          this.scroll = viewport.addComponent(ScrollView);
          this.scroll.content = list;
          this.scroll.horizontal = false;
          this.scroll.vertical = true;
          this.scroll.inertia = true;
          this.scroll.elastic = true;
          this.scroll.cancelInnerEvents = true;
          var model = this.model();
          var items = this.category === 0 ? this.filteredItems() : [];
          if (this.sort) items = items.slice().sort(function (a, b) {
            return (b.quality - a.quality) * (_this7.sort === 1 ? 1 : -1) || b.level - a.level || b.id - a.id;
          });else items = items.slice().reverse();
          var count = Math.max(35, Math.ceil((items.length + 5) / 5) * 5);
          var contentHeight = Math.ceil(count / 5) * 158 + 20;
          list.getComponent(UITransform).setContentSize(800, contentHeight);
          var visible = new Map();
          var drawVisible = function drawVisible() {
            var firstRow = Math.max(0, Math.floor(Math.max(0, _this7.scroll.getScrollOffset().y) / 158) - 1);
            var start = firstRow * 5,
              end = Math.min(count, start + 50);
            visible.forEach(function (node, index) {
              if (index < start || index >= end) {
                node.removeFromParent();
                node.destroy();
                visible["delete"](index);
              }
            });
            var _loop = function _loop() {
                if (visible.has(slot)) return 0; // continue
                var x = -316 + slot % 5 * 158,
                  y = -83 - Math.floor(slot / 5) * 158,
                  item = items[slot];
                if (!item) {
                  var empty;
                  if (_this7.category === 1 && slot === 0) {
                    var _tile = _this7.panel(list, x, y, 146, 146, '#54BBEF', 19);
                    empty = _tile;
                    _this7.text(_tile, '◆', 0, 15, 130, 80, 64, '#E0F7FF');
                    _this7.text(_tile, String(model.materials), 0, -48, 135, 35, 26);
                    _tile.on(Node.EventType.TOUCH_END, function () {
                      return _this7.detail('强化石', '持有 ' + _this7.model().materials + '\n分解装备获得，用于装备详情中的强化。');
                    });
                  } else empty = _this7.panel(list, x, y, 146, 146, '#C9BBAB', 19);
                  visible.set(slot, empty);
                  return 0; // continue
                }

                var owner = model.owner(item.id),
                  tile = gearTile(list, _this7.atlas, item, item.slot, x, y, 146, owner >= 0 ? HERO_CONFIG[owner].name : '');
                visible.set(slot, tile);
                if (_this7.batch && _this7.selected.has(item.id)) {
                  var check = _this7.panel(tile, -45, -43, 46, 40, '#FFDA54', 12);
                  _this7.text(check, '✓', 0, 0, 42, 38, 30);
                }
                tile.on(Node.EventType.TOUCH_END, function () {
                  if (!_this7.batch) {
                    _this7.equipmentDetail(item.id);
                    return;
                  }
                  if (item.locked || model.owner(item.id) >= 0) {
                    _this7.detail('不可分解', '锁定和已穿戴装备不能分解。');
                    return;
                  }
                  if (_this7.selected.has(item.id)) _this7.selected["delete"](item.id);else _this7.selected.add(item.id);
                  _this7.refresh();
                });
              },
              _ret;
            for (var slot = start; slot < end; slot++) {
              _ret = _loop();
              if (_ret === 0) continue;
            }
          };
          if (items.length === 0 && this.category !== 1) this.text(viewport, this.category === 0 ? '没有符合条件的装备' : this.category === 1 ? '暂无材料' : '暂无道具', 0, 360, 640, 58, 32);
          var rail = this.panel(p, 414, -42, 8, 990, '#F4DFC7', 4);
          this.thumb = this.panel(rail, 0, 0, 8, 140, '#F3B64D', 4);
          var update = function update() {
            drawVisible();
            var max = Math.max(1, contentHeight - 1000);
            var t = Math.max(0, Math.min(1, _this7.scroll.getScrollOffset().y / max));
            _this7.thumb.setPosition(0, 425 - t * 850);
          };
          viewport.on(ScrollView.EventType.SCROLLING, update);
          this.scroll.scrollToOffset(new Vec2(0, Math.min(this.savedOffsets[this.category], Math.max(0, contentHeight - 1000))), 0);
          update();
          this.text(p, this.category === 1 ? '强化石 ' + model.materials : this.batch ? '已选 ' + this.selected.size + ' 件' : '共' + items.length + '件', -303, -621, 230, 55, 30);
          this.text(p, this.batch ? '预计 ' + model.salvagePreview(Array.from(this.selected)).materials + ' 强化石' : this.category === 0 ? '自动分解：' + (model.rules.enabled ? '开启' : '关闭') : this.category === 1 ? '分解获得 · 强化消耗' : '暂无物品', -303, -663, 230, 35, 22, '#AA8060');
          this.button(p, this.batch ? '按规则选' : '保留规则', -10, -628, 240, 70, function () {
            if (_this7.batch) {
              _this7.selected = new Set(_this7.filteredItems().filter(function (g) {
                return !model.retained(g);
              }).map(function (g) {
                return g.id;
              }));
              _this7.refresh();
            } else _this7.rulesDetail();
          });
          this.button(p, this.batch ? '分解 ' + this.selected.size + ' 件' : '批量分解', 280, -628, 285, 70, function () {
            if (_this7.batch) {
              _this7.confirmSalvage();
              return;
            }
            _this7.category = 0;
            _this7.batchIds = model.inventory.map(function (g) {
              return g.id;
            });
            _this7.batch = true;
            _this7.selected.clear();
            _this7.savedOffsets[0] = 0;
            _this7.render();
          }, true);
          drawNavigation(p, this.navAtlas, this.atlas, 3, function (i) {
            _this7.save();
            if (i === 0) _this7.navigate('hero');else if (i === 1) _this7.navigate('recruit');else if (i === 2) _this7.navigate('adventure');else if (i === 4) _this7.navigate('dungeon');else if (i !== 3) _this7.detail(i === 1 ? '招募' : '副本', '此功能尚未开放。');
          });
        };
        return BagPage;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleFeedback.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Sprite, Color, UIOpacity, Node, Layers, UITransform, Graphics;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Color = module.Color;
      UIOpacity = module.UIOpacity;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Graphics = module.Graphics;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a9669wftzFJ06/aPWm9xjqN", "BattleFeedback", undefined);
      // Presentation-only clock. Never changes combat actions, cooldowns, income or save data.
      var BattleFeedback = exports('BattleFeedback', /*#__PURE__*/function () {
        function BattleFeedback(units, positions, layer, impact) {
          this.hp = [];
          this.shields = [];
          this.motions = new Map();
          this.pending = [];
          this.effects = [];
          this.clock = 0;
          this.units = units;
          this.positions = positions;
          this.layer = layer;
          this.impact = impact;
        }
        var _proto = BattleFeedback.prototype;
        _proto.reset = function reset(hp, shields) {
          var _this = this;
          this.hp = hp.slice();
          this.shields = shields.slice();
          this.pending = [];
          this.motions.clear();
          this.effects.forEach(function (f) {
            return f.node.destroy();
          });
          this.effects = [];
          this.units.forEach(function (n, i) {
            n.setPosition(_this.positions[i][0], _this.positions[i][1]);
            n.setScale(1, 1, 1);
            n.angle = 0;
            n.getComponent(Sprite).color = Color.WHITE;
            _this.opacity(n).opacity = hp[i] > 0 ? 255 : 0;
          });
        };
        _proto.enter = function enter() {
          for (var i = 3; i < this.units.length; i++) this.motions.set(i, {
            kind: 'spawn',
            age: 0,
            life: .38,
            dx: 150,
            dy: 0,
            strong: false
          });
        };
        _proto.play = function play(hit) {
          var a = this.positions[hit.actor],
            b = this.positions[hit.target],
            dx = b[0] - a[0],
            dy = b[1] - a[1],
            length = Math.hypot(dx, dy) || 1;
          this.motions.set(hit.actor, {
            kind: 'attack',
            age: 0,
            life: .46,
            dx: dx / length,
            dy: dy / length,
            strong: hit.skill
          });
          var ranged = hit.actor < 3 && hit.hero !== 0;
          var delay = hit.target === hit.actor ? .18 : ranged ? .30 : .20;
          this.pending.push({
            hit: hit,
            delay: delay
          });
          if (ranged && hit.damage) this.effect('projectile', a[0] + 18, a[1] + 10, b[0], b[1] + 15, delay, hit.skill ? '#FF993E' : '#A8DDFF');
        };
        _proto.opacity = function opacity(n) {
          return n.getComponent(UIOpacity) || n.addComponent(UIOpacity);
        };
        _proto.effect = function effect(kind, x, y, tx, ty, life, color) {
          if (tx === void 0) {
            tx = x;
          }
          if (ty === void 0) {
            ty = y;
          }
          if (life === void 0) {
            life = .32;
          }
          if (color === void 0) {
            color = '#FFE494';
          }
          if (this.effects.length >= 32) {
            this.effects.shift().node.destroy();
          }
          var n = new Node('Combat ' + kind);
          n.layer = Layers.Enum.UI_2D;
          n.parent = this.layer;
          n.setPosition(x, y);
          n.addComponent(UITransform).setContentSize(130, 130);
          var g = n.addComponent(Graphics);
          g.strokeColor = new Color().fromHEX(color);
          g.fillColor = new Color().fromHEX(color);
          g.lineWidth = 5;
          if (kind === 'projectile') {
            g.moveTo(-24, 0);
            g.lineTo(0, 0);
            g.stroke();
            g.circle(0, 0, 11);
            g.fill();
            g.fillColor = Color.WHITE;
            g.circle(2, 1, 5);
            g.fill();
            n.angle = Math.atan2(ty - y, tx - x) * 180 / Math.PI;
          } else if (kind === 'heal') {
            g.circle(0, 0, 35);
            g.stroke();
            g.rect(-5, -17, 10, 34);
            g.rect(-17, -5, 34, 10);
            g.fill();
          } else if (kind === 'shield') {
            g.moveTo(-28, 25);
            g.lineTo(0, 34);
            g.lineTo(28, 25);
            g.lineTo(23, -12);
            g.lineTo(0, -32);
            g.lineTo(-23, -12);
            g.close();
            g.stroke();
          } else {
            g.circle(0, 0, kind === 'burst' ? 33 : 22);
            g.stroke();
            for (var i = 0; i < 6; i++) {
              var a = i * Math.PI / 3;
              g.moveTo(Math.cos(a) * 29, Math.sin(a) * 29);
              g.lineTo(Math.cos(a) * 47, Math.sin(a) * 47);
              g.stroke();
            }
            g.strokeColor = Color.WHITE;
            g.lineWidth = kind === 'slash' ? 9 : 5;
            g.moveTo(-29, -24);
            g.lineTo(29, 24);
            g.stroke();
            g.lineWidth = 4;
            g.moveTo(-14, 23);
            g.lineTo(14, -23);
            g.stroke();
            g.fillColor = Color.WHITE;
            g.circle(0, 0, 8);
            g.fill();
          }
          this.opacity(n);
          this.effects.push({
            node: n,
            age: 0,
            life: life,
            kind: kind,
            x: x,
            y: y,
            tx: tx,
            ty: ty
          });
        };
        _proto.update = function update(dt) {
          var _this2 = this;
          if (dt <= 0) return;
          this.clock += dt;
          for (var _iterator = _createForOfIteratorHelperLoose(this.pending), _step; !(_step = _iterator()).done;) {
            var p = _step.value;
            p.delay -= dt;
          }
          var due = this.pending.filter(function (p) {
            return p.delay <= 0;
          });
          this.pending = this.pending.filter(function (p) {
            return p.delay > 0;
          });
          for (var _iterator2 = _createForOfIteratorHelperLoose(due), _step2; !(_step2 = _iterator2()).done;) {
            var h = _step2.value.hit;
            this.hp[h.target] = h.hpAfter;
            this.shields[h.target] = h.shieldAfter;
            var _p = this.positions[h.target],
              a = this.positions[h.actor],
              dx = _p[0] - a[0],
              dy = _p[1] - a[1],
              length = Math.hypot(dx, dy) || 1;
            if (h.damage || h.blocked) this.motions.set(h.target, {
              kind: h.killed || h.hpAfter === 0 ? 'death' : 'hurt',
              age: 0,
              life: h.killed || h.hpAfter === 0 ? .38 : .32,
              dx: dx / length,
              dy: dy / length,
              strong: h.skill && h.damage > 0
            });
            this.effect(h.heal ? 'heal' : h.skill && !h.damage && h.hero === 0 || h.blocked && !h.damage ? 'shield' : h.skill ? 'burst' : h.hero === 0 ? 'slash' : 'hit', _p[0], _p[1] + 14, _p[0], _p[1] + 14, .34, h.heal ? '#A4F77D' : h.blocked && !h.damage || h.hero === 0 && h.skill && !h.damage ? '#79DDFE' : h.skill ? '#FFB950' : '#FFE5AD');
            this.impact(h);
          }
          this.units.forEach(function (n, i) {
            var base = _this2.positions[i],
              m = _this2.motions.get(i);
            var x = base[0],
              y = base[1],
              sx = 1,
              sy = 1,
              angle = 0,
              alpha = _this2.hp[i] > 0 ? 255 : 0;
            n.getComponent(Sprite).color = Color.WHITE;
            if (m) {
              m.age += dt;
              var t = Math.min(1, m.age / m.life);
              if (m.kind === 'spawn') {
                x += m.dx * Math.pow(1 - t, 3);
                alpha = 255 * t;
              } else if (m.kind === 'attack') {
                var push = t < .25 ? -12 * (t / .25) : t < .43 ? -12 + 46 * ((t - .25) / .18) : t < .54 ? 34 : 34 * (1 - (t - .54) / .46);
                x += push * m.dx;
                y += push * m.dy * .4;
                sx = 1 + Math.sin(t * Math.PI * 2) * .065;
                sy = 2 - sx;
                angle = -m.dx * Math.sin(t * Math.PI) * 4;
              } else {
                var kick = t < .15 ? t / .15 : t < .32 ? 1 : (1 - t) / .68,
                  amount = m.strong ? 22 : 12;
                x += m.dx * amount * kick;
                y += m.dy * amount * kick;
                angle = m.dx * kick * (m.strong ? 7 : 4);
                sx = 1 + .13 * kick;
                sy = 1 - .12 * kick;
                if (t < .32) n.getComponent(Sprite).color = new Color(255, 205, 175);
                if (m.kind === 'death') {
                  alpha = 255 * (1 - t);
                  sx *= 1 - .18 * t;
                  sy *= 1 - .18 * t;
                  y -= 18 * t;
                }
              }
              if (t >= 1) _this2.motions["delete"](i);
            } else if (alpha) {
              var breath = Math.sin(_this2.clock * 3 + i) * .01;
              sx = i >= 3 ? 1 - breath : 1;
              sy = 1 + breath;
            }
            n.setPosition(x, y);
            n.setScale(sx, sy, 1);
            n.angle = angle;
            _this2.opacity(n).opacity = alpha;
          });
          this.effects = this.effects.filter(function (f) {
            f.age += dt;
            var t = Math.min(1, f.age / f.life);
            if (f.kind === 'projectile') {
              var e = t * t;
              f.node.setPosition(f.x + (f.tx - f.x) * e, f.y + (f.ty - f.y) * e);
            } else {
              var s = .65 + Math.min(1, t * 3) * .55;
              f.node.setScale(s, s, 1);
              _this2.opacity(f.node).opacity = 255 * (1 - t);
            }
            if (t >= 1) {
              f.node.destroy();
              return false;
            }
            return true;
          });
        };
        return BattleFeedback;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleModel.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7c216gQJcpPY5LjaStJYODt", "BattleModel", undefined);
      // Prototype values only; simulation time advances only while fighting.
      var CONFIG = exports('CONFIG', {
        knightHp: 1980,
        slimeHp: 940,
        knightAttack: 128,
        slimeAttack: 105,
        actionSeconds: 1.25,
        skillCooldown: 8,
        shield: 220
      });
      var BattleModel = exports('BattleModel', /*#__PURE__*/function () {
        function BattleModel() {
          this.hp = CONFIG.knightHp;
          this.enemyHp = CONFIG.slimeHp;
          this.shield = 0;
          this.cooldown = 0;
          this.elapsed = 0;
          this.actions = 0;
          this.damage = 0;
          this.received = 0;
          this.autoSkill = true;
          this.paused = false;
          this.queued = false;
          this.result = 'fighting';
          this.timer = 0;
        }
        var _proto = BattleModel.prototype;
        _proto.requestSkill = function requestSkill() {
          if (this.result !== 'fighting' || this.cooldown > 0 || this.queued) return false;
          this.queued = true;
          return true;
        };
        _proto.step = function step(dt) {
          if (this.paused || this.result !== 'fighting' || dt <= 0) return [];
          var hits = [];
          // Fixed substeps keep cooldown/turn behavior stable at different frame rates.
          while (dt > 0 && this.result === 'fighting') {
            var delta = Math.min(dt, CONFIG.actionSeconds - this.timer);
            this.timer += delta;
            this.elapsed += delta;
            this.cooldown = Math.max(0, this.cooldown - delta);
            dt -= delta;
            if (this.timer + 1e-8 < CONFIG.actionSeconds) break;
            this.timer = 0;
            var actor = this.actions++ % 2 === 0 ? 'knight' : 'slime';
            var damage = 0,
              blocked = 0,
              skill = false;
            if (actor === 'knight') {
              if (this.cooldown <= 0 && (this.autoSkill || this.queued)) {
                skill = true;
                this.queued = false;
                this.shield = CONFIG.shield;
                this.cooldown = CONFIG.skillCooldown;
              } else {
                damage = Math.min(this.enemyHp, CONFIG.knightAttack);
                this.enemyHp -= damage;
                this.damage += damage;
              }
            } else {
              blocked = Math.min(this.shield, CONFIG.slimeAttack);
              this.shield -= blocked;
              damage = Math.min(this.hp, CONFIG.slimeAttack - blocked);
              this.hp -= damage;
              this.received += damage;
            }
            hits.push({
              actor: actor,
              damage: damage,
              blocked: blocked,
              skill: skill
            });
            if (this.enemyHp <= 0) this.result = 'victory';else if (this.hp <= 0) this.result = 'defeat';
          }
          return hits;
        };
        return BattleModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleTiming.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('battleDelta', battleDelta);
      cclegacy._RF.push({}, "6ed462I5e9NKI0gmsyAT8K9", "BattleTiming", undefined);
      /** Battle time only: callers settle idle income using the unscaled wall clock. */
      function battleDelta(frame, paused, speed) {
        if (paused || !Number.isFinite(frame) || frame <= 0) return 0;
        return Math.min(frame, .1) * (speed === 2 ? 2 : 1);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BattleTiming.ts', './SquadBattleModel.ts', './BattleFeedback.ts', './GearView.ts', './ModalView.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, SpriteFrame, Rect, Sprite, Tween, Node, Layers, UITransform, Graphics, Color, Label, Mask, UIOpacity, tween, Vec3, battleDelta, HERO_CONFIG, DUNGEON_CONFIG, DROP_SECONDS, SKILL_NAMES, BattleFeedback, drawNavigation, ModalView, modalButton, modalText, modalSection;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Rect = module.Rect;
      Sprite = module.Sprite;
      Tween = module.Tween;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Graphics = module.Graphics;
      Color = module.Color;
      Label = module.Label;
      Mask = module.Mask;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      battleDelta = module.battleDelta;
    }, function (module) {
      HERO_CONFIG = module.HERO_CONFIG;
      DUNGEON_CONFIG = module.DUNGEON_CONFIG;
      DROP_SECONDS = module.DROP_SECONDS;
      SKILL_NAMES = module.SKILL_NAMES;
    }, function (module) {
      BattleFeedback = module.BattleFeedback;
    }, function (module) {
      drawNavigation = module.drawNavigation;
    }, function (module) {
      ModalView = module.ModalView;
      modalButton = module.modalButton;
      modalText = module.modalText;
      modalSection = module.modalSection;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a07dexfNDdAGZNtxE3lWYxI", "BattleView", undefined);
      var C = {
        ink: '#704124',
        cream: '#FFF6E4'
      };
      /** Shared adventure/dungeon presentation. Resource settlement stays with the owning page. */
      var BattleView = exports('BattleView', /*#__PURE__*/function () {
        function BattleView(parent, getModel, art, options) {
          this.root = void 0;
          this.speed = 1;
          this.battleArt = void 0;
          this.actors = void 0;
          this.resultButton = null;
          this.units = [];
          this.hpLabels = [];
          this.bars = [];
          this.partyHP = [];
          this.partyBars = [];
          this.skillLabels = [];
          this.skillShades = [];
          this.turns = [];
          this.positions = [[-95, 75], [-290, 260], [-290, -55], [260, 270], [210, 70], [270, -135]];
          this.status = void 0;
          this.notice = void 0;
          this.speedLabel = void 0;
          this.pauseLabel = void 0;
          this.stats = void 0;
          this.enemyNames = [];
          this.goldLabel = void 0;
          this.incomeLabel = void 0;
          this.heartIcons = [];
          this.shields = [];
          this.shieldIcons = [];
          this.partyShields = [];
          this.partyShieldIcons = [];
          this.feedback = void 0;
          this.autoDot = void 0;
          this.menu = void 0;
          this.ui = void 0;
          this.heroTextures = [];
          this.monsters = void 0;
          this.enemyPortraits = [];
          this.shownWave = 0;
          this.shownRegroup = false;
          this.floating = [];
          this.floatTimer = 0;
          this.floatSerial = 0;
          this.effects = new Set();
          this.externalPresentation = false;
          this.externalForest = null;
          this.statisticsModal = null;
          this.getModel = getModel;
          this.options = options;
          this.root = new Node(options.dungeon ? 'Dungeon battle' : 'Adventure page');
          this.root.layer = Layers.Enum.UI_2D;
          this.root.parent = parent;
          this.root.addComponent(UITransform).setContentSize(887, 1774);
          this.ui = art.ui;
          this.heroTextures = art.heroes;
          this.monsters = art.monsters;
          this.battleArt = [art.forest, art.nav, art.bag];
          this.rebuildBattle();
        }
        var _proto = BattleView.prototype;
        _proto.useExternalPresentation = function useExternalPresentation(texture) {
          this.externalPresentation = true;
          if (texture) this.externalForest = texture;
          for (var _iterator = _createForOfIteratorHelperLoose(this.root.children), _step; !(_step = _iterator()).done;) {
            var n = _step.value;
            n.active = n === this.actors || n.name === 'Forest';
          }
          var forest = this.root.getChildByName('Forest');
          if (forest && this.externalForest) {
            var f = new SpriteFrame();
            f.texture = this.externalForest;
            f.rect = new Rect(0, 0, this.externalForest.width / 2, this.externalForest.height / 3);
            forest.getComponent(Sprite).spriteFrame = f;
          }
        };
        _proto.getSpeed = function getSpeed() {
          return this.speed;
        };
        _proto.cycleSpeed = function cycleSpeed() {
          this.speed = this.speed === 1 ? 2 : 1;
        };
        _proto.update = function update(dt) {
          var visual = battleDelta(dt, this.model.paused, this.speed);
          this.feedback.update(visual);
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.model.step(visual)), _step2; !(_step2 = _iterator2()).done;) {
            var hit = _step2.value;
            this.feedback.play(hit);
          }
          this.updateFloats(this.model.paused ? 0 : dt);
          this.sync();
        };
        _proto.destroy = function destroy() {
          this.effects.forEach(function (n) {
            Tween.stopAllByTarget(n);
            n.destroy();
          });
          this.effects.clear();
          this.root.active = false;
          this.root.destroy();
        };
        _proto.rebuildBattle = function rebuildBattle() {
          var _this = this;
          this.effects.forEach(function (n) {
            Tween.stopAllByTarget(n);
            n.destroy();
          });
          this.effects.clear();
          this.floating = [];
          this.root.destroyAllChildren();
          this.units = [];
          this.turns = [];
          this.enemyPortraits = [];
          this.partyHP = [];
          this.partyBars = [];
          this.skillLabels = [];
          this.skillShades = [];
          this.partyShields = [];
          this.partyShieldIcons = [];
          this.panel('Page', 0, 0, 887, 1774, C.cream, 0);
          var _this$battleArt = this.battleArt,
            forest = _this$battleArt[0],
            heroUI = _this$battleArt[1],
            bagUI = _this$battleArt[2];
          this.shownWave = 0;
          this.picture(forest, new Rect(0, 0, forest.width, forest.height), 0, 277, 887, 1220, 'Forest');
          this.actors = this.base('Battle actors', 0, 0, 887, 1774);
          this.model.formation.forEach(function (id, i) {
            var t = _this.heroTextures[id];
            var _this$positions$i = _this.positions[i],
              x = _this$positions$i[0],
              y = _this$positions$i[1];
            _this.units.push(_this.picture(t, new Rect(0, 0, t.width, t.height), x, y, i === 0 ? 280 : 260, i === 0 ? 280 : 260, HERO_CONFIG[_this.model.formation[i]].name));
          });
          for (var i = this.units.length; i < 3; i++) {
            this.units[i] = this.picture(this.heroTextures[0], new Rect(0, 0, this.heroTextures[0].width, this.heroTextures[0].height), this.positions[i][0], this.positions[i][1], 260, 260, 'Empty slot');
          }
          this.model.enemies.forEach(function (e, j) {
            var _this$positions = _this.positions[j + 3],
              x = _this$positions[0],
              y = _this$positions[1];
            _this.units.push(_this.picture(_this.monsters, _this.monsterRect(j), x, y, 260, 260, 'Monster ' + j));
          });
          this.units.forEach(function (n) {
            return n.parent = _this.actors;
          });
          if (this.model.formation.length > 1) this.units[1].setSiblingIndex(0);
          var fxLayer = this.base('Combat effects', 0, 0, 887, 1774, this.actors);
          this.feedback = new BattleFeedback(this.units, this.positions, fxLayer, function (h) {
            return _this.impactText(h);
          });
          this.resetFeedback();
          this.drawPage(heroUI, bagUI);
          this.sync();
          if (this.externalPresentation) this.useExternalPresentation();
          this.pauseLabel.string = this.model.paused ? '继续战斗' : '暂停战斗';
        };
        _proto.base = function base(name, x, y, w, h, parent) {
          if (parent === void 0) {
            parent = this.root;
          }
          var n = new Node(name);
          n.layer = Layers.Enum.UI_2D;
          n.parent = parent;
          n.setPosition(x, y);
          n.addComponent(UITransform).setContentSize(w, h);
          return n;
        };
        _proto.panel = function panel(name, x, y, w, h, color, r, parent) {
          if (r === void 0) {
            r = 24;
          }
          if (parent === void 0) {
            parent = this.root;
          }
          var n = this.base(name, x, y, w, h, parent);
          var g = n.addComponent(Graphics);
          g.fillColor = new Color().fromHEX(color);
          g.roundRect(-w / 2, -h / 2, w, h, r);
          g.fill();
          return n;
        };
        _proto.label = function label(text, x, y, w, h, size, color, parent) {
          if (size === void 0) {
            size = 28;
          }
          if (color === void 0) {
            color = C.ink;
          }
          if (parent === void 0) {
            parent = this.root;
          }
          var n = this.base(text, x, y, w, h, parent),
            l = n.addComponent(Label);
          l.string = text;
          l.fontFamily = 'Microsoft YaHei';
          l.fontSize = size;
          l.lineHeight = size * 1.3;
          l.isBold = true;
          l.color = new Color().fromHEX(color);
          l.horizontalAlign = Label.HorizontalAlign.CENTER;
          l.verticalAlign = Label.VerticalAlign.CENTER;
          l.overflow = Label.Overflow.SHRINK;
          return l;
        };
        _proto.button = function button(text, x, y, w, h, fn, color) {
          if (color === void 0) {
            color = C.cream;
          }
          var n = this.panel(text, x, y, w, h, color, 22);
          var l = this.label(text, 0, 0, w - 12, h - 8, 28, C.ink, n);
          n.on(Node.EventType.TOUCH_END, function () {
            fn();
          });
          return l;
        };
        _proto.picture = function picture(t, rect, x, y, w, h, name) {
          var n = this.base(name, x, y, w, h);
          var f = new SpriteFrame();
          f.texture = t;
          f.rect = rect;
          var s = n.addComponent(Sprite);
          s.sizeMode = Sprite.SizeMode.CUSTOM;
          s.spriteFrame = f;
          n.getComponent(UITransform).setContentSize(w, h);
          return n;
        };
        _proto.bar = function bar(x, y) {
          var n = this.base('Health', x, y, 150, 18),
            g = n.addComponent(Graphics);
          return g;
        };
        _proto.paintBar = function paintBar(g, value, max, color, shield) {
          if (shield === void 0) {
            shield = 0;
          }
          g.clear();
          g.fillColor = new Color().fromHEX('#65502E');
          g.roundRect(-76, -9, 152, 18, 9);
          g.fill();
          g.fillColor = new Color().fromHEX('#DDD2AA');
          g.roundRect(-73, -6, 146, 12, 6);
          g.fill();
          if (value > 0) {
            var w = Math.max(8, 146 * value / max);
            g.fillColor = new Color().fromHEX(color);
            g.roundRect(-73, -6, w, 12, 6);
            g.fill();
            g.fillColor = new Color(255, 255, 210, 110);
            g.roundRect(-71, 1, Math.max(4, w - 4), 4, 2);
            g.fill();
          }
          if (shield > 0) {
            var _w = 158 * Math.min(1, shield / max),
              left = 79 - _w,
              r = Math.min(11, _w / 2);
            g.strokeColor = new Color().fromHEX('#6EDBFF');
            g.lineWidth = 4;
            g.moveTo(left, 12);
            g.lineTo(79 - r, 12);
            g.quadraticCurveTo(79, 12, 79, 12 - r);
            g.lineTo(79, -12 + r);
            g.quadraticCurveTo(79, -12, 79 - r, -12);
            g.lineTo(left, -12);
            g.stroke();
          }
        };
        _proto.valueLabel = function valueLabel(text, x, y, w, size) {
          var l = this.label(text, x, y, w, 36, size, '#FFFFFF');
          l.enableOutline = true;
          l.outlineWidth = 2;
          l.outlineColor = new Color(28, 47, 45, 255);
          l.horizontalAlign = 0;
          return l;
        };
        _proto.statusIcon = function statusIcon(kind, x, y, color) {
          var n = this.base(kind, x, y, 24, 24),
            g = n.addComponent(Graphics);
          g.fillColor = new Color().fromHEX(color);
          g.strokeColor = new Color(38, 86, 75, 255);
          g.lineWidth = 1.5;
          if (kind === 'heart') {
            g.moveTo(0, -10);
            g.bezierCurveTo(-23, 3, -8, 21, 0, 8);
            g.bezierCurveTo(8, 21, 23, 3, 0, -10);
          } else {
            g.moveTo(-10, 8);
            g.lineTo(0, 12);
            g.lineTo(10, 8);
            g.lineTo(8, -4);
            g.lineTo(0, -12);
            g.lineTo(-8, -4);
          }
          g.close();
          g.fill();
          g.stroke();
          return n;
        };
        _proto.refreshFormation = function refreshFormation() {
          this.rebuildBattle();
        };
        _proto.resetFeedback = function resetFeedback() {
          var _this2 = this;
          this.feedback.reset([].concat([0, 1, 2].map(function (i) {
            var _this2$model$party$i;
            return ((_this2$model$party$i = _this2.model.party[i]) == null ? void 0 : _this2$model$party$i.hp) || 0;
          }), this.model.enemies.map(function (e) {
            return e.hp;
          })), [].concat([0, 1, 2].map(function (i) {
            var _this2$model$party$i2;
            return ((_this2$model$party$i2 = _this2.model.party[i]) == null ? void 0 : _this2$model$party$i2.shield) || 0;
          }), [0, 0, 0]));
        }
        // Native Cocos SpriteFrame regions reference the untouched concept texture.
        // Only reusable UI pieces are sampled; combat and live values are real nodes.
        ;

        _proto.cut = function cut(name, sx, sy, sw, sh, x, y, w, h) {
          if (w === void 0) {
            w = sw;
          }
          if (h === void 0) {
            h = sh;
          }
          return this.picture(this.ui, new Rect(sx, sy, sw, sh), x, y, w, h, name);
        };
        _proto.roundPortrait = function roundPortrait(n) {
          var size = n.getComponent(UITransform).contentSize;
          var holder = this.base(n.name + ' mask', n.position.x, n.position.y, size.width, size.height);
          holder.addComponent(Mask).type = Mask.Type.GRAPHICS_ELLIPSE;
          n.parent = holder;
          n.setPosition(0, 0);
        };
        _proto.drawPage = function drawPage(navAtlas, bagAtlas) {
          var _this3 = this;
          // Match v5's 887 x 1774 layout: forest 0..1220, party 1220..1610, nav below.
          this.cut('Menu', 17, 30, 68, 63, -392, 826).on(Node.EventType.TOUCH_END, function () {
            _this3.menu.active = !_this3.menu.active;
          });
          this.label(this.options.title, 0, 811, 640, 82, this.options.dungeon ? 48 : 60, '#542A12');
          this.status = this.label('第1波', 0, 754, 340, 48, 35);
          this.cut('Coin', 22, 110, 45, 45, -400, 754);
          this.goldLabel = this.label('0', -328, 754, 105, 46, 35);
          this.panel('Checkpoint rail', 0, 714, 390, 8, '#BFA77B', 4);
          for (var i = 0; i < 6; i++) {
            var x = -192 + i * 59;
            this.panel('Checkpoint rim', x, 714, 24, 24, '#FFFAE8', 12);
            this.panel('Checkpoint ' + i, x, 714, 18, 18, i === 0 ? '#72C631' : '#C2AD86', 9);
          }
          this.label('⚑', 183, 717, 70, 55, 48, '#AC9368');
          this.incomeLabel = this.label('击杀 0 · 每位英雄经验 +0', 0, 678, 700, 42, 25);
          this.label('行动顺序', -332, 611, 220, 48, 28);
          if (this.options.onIncome) {
            this.cut('Offline rewards', 17, 30, 68, 63, -392, 510).on(Node.EventType.TOUCH_END, this.options.onIncome);
            this.label('收益', -392, 457, 95, 40, 23);
          }
          this.model.order.forEach(function (id, i) {
            var x = -200 + i * 99;
            _this3.turns[id] = _this3.panel('Turn ' + id, x, 611, 85, 85, '#FFD34F', 42);
            var t = id >= 3 ? _this3.monsters : _this3.heroTextures[_this3.model.formation[id]];
            var rect = id >= 3 ? _this3.monsterRect(id - 3) : new Rect(0, 0, t.width, t.height);
            var portrait = _this3.picture(t, rect, x, 611, 82, 82, 'Initiative ' + id);
            if (id >= 3) _this3.enemyPortraits[id - 3] = portrait;
            if (i < 5) _this3.label('›', x + 49, 611, 35, 44, 38);
          });
          this.speedLabel = this.button(this.speed + '×', 385, 512, 80, 65, function () {
            _this3.speed = _this3.speed === 1 ? 2 : 1;
            _this3.speedLabel.string = _this3.speed + '×';
          });
          this.speedLabel.fontSize = 40;
          this.cut('Statistics button', 788, 421, 81, 84, 385, 424).on(Node.EventType.TOUCH_END, function () {
            return _this3.showStatistics();
          });
          this.cut('Auto skill button', 788, 519, 83, 86, 385, 325).on(Node.EventType.TOUCH_END, function () {
            _this3.model.autoSkill = !_this3.model.autoSkill;
            _this3.sync();
            _this3.options.onChange();
          });
          this.autoDot = this.base('Auto state', 416, 361, 26, 26).addComponent(Graphics);
          this.positions.forEach(function (_ref, i) {
            var x = _ref[0],
              y = _ref[1];
            var by = y - (i >= 3 ? 125 : 140);
            _this3.bars[i] = _this3.bar(x, by);
            _this3.heartIcons[i] = _this3.statusIcon('heart', x - 70, by - 24, i < 3 ? '#72E843' : '#FF967B');
            _this3.hpLabels[i] = _this3.valueLabel('', x + 23, by - 24, 150, 26);
            _this3.shields[i] = _this3.valueLabel('', x + 23, by - 51, 150, 25);
            _this3.shieldIcons[i] = _this3.statusIcon('shield', x - 70, by - 51, '#6EDBFF');
            [_this3.bars[i].node, _this3.heartIcons[i], _this3.hpLabels[i].node, _this3.shields[i].node, _this3.shieldIcons[i]].forEach(function (n) {
              return n.parent = _this3.actors;
            });
          });
          this.model.enemies.forEach(function (e, j) {
            var _this3$positions = _this3.positions[j + 3],
              x = _this3$positions[0],
              y = _this3$positions[1];
            _this3.enemyNames[j] = _this3.label('', x, y + 105, 220, 32, 23);
            _this3.enemyNames[j].node.parent = _this3.actors;
          });
          this.cut('Formation', 22, 1141, 152, 59, -346, -260).on(Node.EventType.TOUCH_END, function () {
            return _this3.options.onFormation();
          });
          this.notice = this.label(this.options.dungeon ? '点击技能手动释放 · 可切换自动技能' : '持续挂机 · 收益按实际时间结算', 55, -270, 570, 42, 23);
          this.notice.node.name = 'Battle notice';
          this.cut('Party background', 580, 1230, 8, 370, 0, -528, 887, 390);
          for (var _i = 0, _arr = [-148, 148]; _i < _arr.length; _i++) {
            var _x = _arr[_i];
            this.panel('Party divider', _x, -514, 2, 260, '#EBD6AF', 0);
          }
          var xs = [-365, -70, 225];
          var _loop = function _loop(_i2) {
            var id = _this3.model.formation[_i2],
              t = _this3.heroTextures[id];
            var portrait = _this3.picture(t, new Rect(0, 0, t.width, t.height), xs[_i2], -430, 112, 112, 'Party ' + _i2);
            _this3.roundPortrait(portrait);
            _this3.label(HERO_CONFIG[id].name, xs[_i2] + 113, -410, 135, 44, 31);
            _this3.partyBars[_i2] = _this3.bar(xs[_i2] + 128, -450);
            _this3.statusIcon('heart', xs[_i2] + 42, -478, '#72E843');
            _this3.partyHP[_i2] = _this3.valueLabel('', xs[_i2] + 135, -478, 150, 24);
            _this3.partyShields[_i2] = _this3.valueLabel('', xs[_i2] + 135, -512, 150, 23);
            _this3.partyShieldIcons[_i2] = _this3.statusIcon('shield', xs[_i2] + 42, -512, '#6EDBFF');
            var _loop2 = function _loop2(j) {
              var x = -355 + _i2 * 295 + j * 133;
              var n = _this3.model.unlocked(id, j * 2) ? id === 3 ? _this3.picture(bagAtlas, new Rect(405, 618, 120, 85), x, -585, 120, 120, 'Archer skill') : _this3.cut('Skill ' + _i2, [28, 316, 612][id], 1413, 120, 120, x, -585) : _this3.cut('Locked ' + _i2, 161, 1413, 116, 120, x, -585);
              n.on(Node.EventType.TOUCH_END, function () {
                _this3.toast(_this3.model.requestSkill(_i2, j) ? SKILL_NAMES[id][j * 2] + '已排队' : '技能未解锁、冷却中、已排队或已倒下');
                _this3.sync();
                _this3.options.onChange();
              });
              _this3.label(_this3.model.unlocked(id, j * 2) ? SKILL_NAMES[id][j * 2] : j === 1 ? '5级解锁' : '待解锁', x, -669, 135, 48, 30, C.ink);
              _this3.skillShades[_i2 * 2 + j] = _this3.base('Cooldown ' + _i2 + ' ' + j, x, -585, 120, 120).addComponent(Graphics);
              _this3.skillLabels[_i2 * 2 + j] = _this3.label('', x, -585, 110, 70, 30, '#FFFFFF');
            };
            for (var j = 0; j < 2; j++) {
              _loop2(j);
            }
          };
          for (var _i2 = 0; _i2 < this.model.formation.length; _i2++) {
            _loop(_i2);
          }
          drawNavigation(this.root, navAtlas, bagAtlas, this.options.dungeon ? 4 : 2, this.options.navigate);
          this.stats = this.label('', -25, 425, 600, 155, 25);
          this.stats.node.active = false;
          var menuView = new ModalView(this.root, '战斗设置', 870, function () {
            _this3.menu.active = false;
          });
          this.menu = menuView.layer;
          var card = menuView.card;
          var pause = modalButton(card, '暂停战斗', 0, 145, 520, 78, function () {
            if (_this3.model.result !== 'fighting') return;
            _this3.model.paused = !_this3.model.paused;
            _this3.pauseLabel.string = _this3.model.paused ? '继续战斗' : '暂停战斗';
            _this3.options.onChange();
          });
          this.pauseLabel = pause.children[pause.children.length - 1].getComponent(Label);
          if (this.options.dungeon) {
            modalButton(card, '离开战斗', 0, 30, 520, 78, function () {
              return _this3.options.onLeave();
            }, 'peach');
            modalText(card, '离开可继续挑战；结束不返还体力与次数。', 0, -95, 680, 85, 25);
            modalButton(card, '结束挑战', 0, -300, 520, 78, function () {
              return _this3.options.onEnd();
            }, 'peach');
          } else {
            modalButton(card, '重新挑战', 0, 30, 520, 78, function () {
              _this3.options.onRestart();
            }, 'peach');
            modalText(card, '重新挑战会重置当前波战斗，保留成长与收益。', 0, -95, 680, 85, 25);
            modalButton(card, '切换怪物并重试', 0, -300, 520, 78, function () {
              return _this3.options.onRestart((_this3.model.monsterIndex + 1) % 4);
            }, 'peach');
          }
          this.menu.active = false;
          if (this.options.dungeon) {
            this.resultButton = this.button('查看结算', 55, -270, 570, 59, function () {
              return _this3.options.onEnd();
            }).node.parent;
            this.resultButton.active = false;
          }
        };
        _proto.showStatistics = function showStatistics() {
          var _this4 = this;
          if (this.statisticsModal) {
            this.statisticsModal.destroy();
            this.statisticsModal = null;
            return;
          }
          var view = new ModalView(this.root, '战斗统计', 920, function () {
            view.layer.destroy();
            _this4.statisticsModal = null;
          });
          this.statisticsModal = view.layer;
          modalSection(view.card, '输出与治疗', 215);
          this.stats = this.label('', 0, 5, 680, 300, 31, C.ink, view.card);
          this.sync();
          modalText(view.card, '统计当前挑战中的实际伤害、治疗与承伤。', 0, -270, 680, 75, 24);
        };
        _proto.toast = function toast(s) {
          this.notice.string = s;
        };
        _proto.monsterRect = function monsterRect(slot) {
          if (slot === void 0) {
            slot = 0;
          }
          var i = this.model.enemies[slot].kind;
          return new Rect(i % 2 * this.monsters.width / 2, Math.floor(i / 2) * this.monsters.height / 2, this.monsters.width / 2, this.monsters.height / 2);
        };
        _proto.setMonsterFrame = function setMonsterFrame(n, slot) {
          var f = new SpriteFrame();
          f.texture = this.monsters;
          f.rect = this.monsterRect(slot);
          n.getComponent(Sprite).spriteFrame = f;
        };
        _proto.sync = function sync() {
          var _b$encounter,
            _this5 = this;
          var b = this.model;
          if (this.resultButton) {
            this.resultButton.active = b.result !== 'fighting';
            this.notice.node.active = b.result === 'fighting';
          }
          this.status.string = this.options.dungeon ? this.options.subtitle() : b.regrouping ? '整备后重试' : b.waveDelay > 0 ? '下一波即将入场' : '第 ' + b.wave + ' 波';
          this.goldLabel.string = String(b.gold);
          this.incomeLabel.string = this.options.dungeon ? ((_b$encounter = b.encounter) == null ? void 0 : _b$encounter.id) === 5 ? '第 ' + b.wave + ' 关 · 已通关 ' + b.clearedWaves : b.wave > DUNGEON_CONFIG.mobWaves ? 'Boss 波 · 击败首领及护卫' : '第 ' + b.wave + '/' + (DUNGEON_CONFIG.mobWaves + 1) + ' 波 · 击败 ' + b.enemies.filter(function (e) {
            return e.hp <= 0;
          }).length + '/3' : '击杀 ' + b.kills + ' · 装备 ' + b.inventory.length + ' · 下件 ' + Math.ceil(DROP_SECONDS - b.dropRemainder) + '秒';
          if (this.shownWave !== b.wave || this.shownRegroup && !b.regrouping) {
            this.shownWave = b.wave;
            this.model.enemies.forEach(function (e, j) {
              var n = _this5.units[j + 3];
              var size = b.encounter && b.encounter.id !== 5 && b.wave > DUNGEON_CONFIG.mobWaves && j === 0 ? 330 : 260;
              n.getComponent(UITransform).setContentSize(size, size);
              _this5.setMonsterFrame(n, j);
              _this5.setMonsterFrame(_this5.enemyPortraits[j], j);
            });
            this.resetFeedback();
            this.feedback.enter();
          }
          this.shownRegroup = b.regrouping;
          b.enemies.forEach(function (e, j) {
            var i = j + 3,
              hp = _this5.feedback.hp[i];
            _this5.hpLabels[i].string = hp + '/' + e.maxHp;
            _this5.paintBar(_this5.bars[i], hp, e.maxHp, '#F38B71');
            _this5.enemyNames[j].string = b.encounter && b.encounter.id !== 5 && b.wave > DUNGEON_CONFIG.mobWaves && j === 0 && hp > 0 ? 'BOSS' : '';
            _this5.heartIcons[i].active = hp > 0;
            _this5.hpLabels[i].node.active = hp > 0;
            _this5.bars[i].node.active = hp > 0;
            _this5.shields[i].node.active = false;
            _this5.shieldIcons[i].active = false;
          });
          for (var i = 0; i < 3; i++) {
            var active = i < b.formation.length;
            this.bars[i].node.active = active;
            this.hpLabels[i].node.active = active;
            this.heartIcons[i].active = active;
            if (!active) {
              this.shields[i].node.active = false;
              this.shieldIcons[i].active = false;
            }
          }
          b.party.forEach(function (h, i) {
            var hp = _this5.feedback.hp[i],
              shield = _this5.feedback.shields[i];
            _this5.hpLabels[i].string = hp + '/' + b.battleStats(i).hp;
            _this5.partyHP[i].string = _this5.hpLabels[i].string;
            _this5.paintBar(_this5.bars[i], hp, b.battleStats(i).hp, '#9AF032', shield);
            _this5.paintBar(_this5.partyBars[i], hp, b.battleStats(i).hp, '#9AF032', shield);
            for (var _i3 = 0, _arr2 = [_this5.shields[i], _this5.partyShields[i]]; _i3 < _arr2.length; _i3++) {
              var l = _arr2[_i3];
              l.string = String(shield);
              l.node.active = shield > 0 && hp > 0;
            }
            _this5.shieldIcons[i].active = _this5.partyShieldIcons[i].active = shield > 0 && hp > 0;
            for (var j = 0; j < 2; j++) {
              var cd = j ? h.cooldown2 : h.cooldown,
                q = j ? h.queued2 : h.queued,
                open = b.unlocked(b.formation[i], j * 2);
              _this5.skillLabels[i * 2 + j].string = !open ? '' : h.hp <= 0 ? '已倒下' : q ? '已排队' : cd > 0 ? cd.toFixed(1) : '';
              var g = _this5.skillShades[i * 2 + j];
              g.clear();
              if (cd > 0 || h.hp <= 0) {
                g.fillColor = new Color(15, 34, 62, 155);
                g.roundRect(-60, -60, 120, h.hp <= 0 ? 120 : Math.max(1, 120 * cd / (j ? b.secondCooldown(b.formation[i]) : b.battleStats(i).cooldown)), 10);
                g.fill();
              }
            }
          });
          this.autoDot.clear();
          this.autoDot.fillColor = new Color().fromHEX('#FFFFFF');
          this.autoDot.circle(0, 0, 13);
          this.autoDot.fill();
          this.autoDot.fillColor = new Color().fromHEX(b.autoSkill ? '#71C730' : '#B8A789');
          this.autoDot.circle(0, 0, 10);
          this.autoDot.fill();
          this.turns.forEach(function (n, i) {
            return n.active = !_this5.externalPresentation && b.result === 'fighting' && b.waveDelay === 0 && i === b.nextActor;
          });
          if (this.stats && this.stats.isValid) this.stats.string = b.party.map(function (h, i) {
            return b.battleStats(i).name + ' ' + h.damage + (b.formation[i] === 2 ? ' / 治疗 ' + h.healing : '');
          }).join('\n') + '\n承伤 ' + b.received + ' · ' + b.elapsed.toFixed(1) + '秒';
        };
        _proto.impactText = function impactText(hit) {
          if (hit.damage) this.floating.push({
            target: hit.target,
            text: (hit.skill && hit.actor < 3 ? SKILL_NAMES[this.model.formation[hit.actor]][hit.skillSlot || 0] + ' ' : '−') + hit.damage,
            color: hit.actor >= 3 ? '#EE7463' : hit.skill ? '#FFCD58' : '#FFFFFF'
          });
          if (hit.blocked) this.floating.push({
            target: hit.target,
            text: '吸收 ' + hit.blocked,
            color: '#8BD8FF'
          });
          if (hit.heal) this.floating.push({
            target: hit.target,
            text: '+' + hit.heal,
            color: '#95EF72'
          });
          if (hit.skill && !hit.damage && hit.actor < 3 && this.model.formation[hit.actor] === 0) this.floating.push({
            target: hit.actor,
            text: '护盾 +' + this.model.battleStats(hit.actor).power,
            color: '#8BD8FF'
          });
          this.floatTimer = 0;
          if (this.floating.length > 18) this.floating.splice(0, this.floating.length - 18);
        };
        _proto.updateFloats = function updateFloats(dt) {
          var _this6 = this;
          this.floatTimer -= dt;
          if (this.floatTimer > 0 || !this.floating.length) return;
          this.floatTimer = .16;
          var f = this.floating.shift(),
            p = this.positions[f.target],
            lane = this.floatSerial++ % 3;
          var l = this.label(f.text, p[0] + (lane - 1) * 23, p[1] + 62 + lane * 18, 240, 48, 32, f.color, this.actors);
          l.enableOutline = true;
          l.outlineColor = new Color(79, 48, 25, 220);
          l.outlineWidth = 2;
          var o = l.node.addComponent(UIOpacity);
          this.effects.add(l.node);
          l.node.setScale(.85, .85, 1);
          tween(l.node).to(.10, {
            scale: new Vec3(1.08, 1.08, 1)
          }).to(.1, {
            scale: Vec3.ONE
          }).by(.65, {
            position: new Vec3(0, 54, 0)
          }).call(function () {
            _this6.effects["delete"](l.node);
            l.node.destroy();
          }).start();
          tween(o).delay(.48).to(.37, {
            opacity: 0
          }).start();
        };
        _createClass(BattleView, [{
          key: "model",
          get: function get() {
            return this.getModel();
          }
        }]);
        return BattleView;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DungeonPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FormationModal.ts', './SquadBattleModel.ts', './ModalView.ts', './GearView.ts', './BattleView.ts'], function (exports) {
  var _createClass, cclegacy, Rect, Mask, ScrollView, formationModal, SquadBattleModel, generateGear, DUNGEONS, DIFFICULTIES, DUNGEON_CONFIG, HERO_CONFIG, dungeonReward, modalImage, modalText, ModalView, modalNode, modalPanel, modalButton, modalSection, modalRow, drawNavigation, gearTile, BattleView;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Rect = module.Rect;
      Mask = module.Mask;
      ScrollView = module.ScrollView;
    }, function (module) {
      formationModal = module.formationModal;
    }, function (module) {
      SquadBattleModel = module.SquadBattleModel;
      generateGear = module.generateGear;
      DUNGEONS = module.DUNGEONS;
      DIFFICULTIES = module.DIFFICULTIES;
      DUNGEON_CONFIG = module.DUNGEON_CONFIG;
      HERO_CONFIG = module.HERO_CONFIG;
      dungeonReward = module.dungeonReward;
    }, function (module) {
      modalImage = module.modalImage;
      modalText = module.modalText;
      ModalView = module.ModalView;
      modalNode = module.modalNode;
      modalPanel = module.modalPanel;
      modalButton = module.modalButton;
      modalSection = module.modalSection;
      modalRow = module.modalRow;
    }, function (module) {
      drawNavigation = module.drawNavigation;
      gearTile = module.gearTile;
    }, function (module) {
      BattleView = module.BattleView;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6768aUPyTFAargTx6UOXD3O", "DungeonPage", undefined);
      var DungeonPage = exports('DungeonPage', /*#__PURE__*/function () {
        var _proto = DungeonPage.prototype;
        _proto.startExternal = function startExternal(id, difficulty) {
          var error = this.transact(function (b) {
            return b.startDungeon(id, difficulty, Date.now());
          });
          if (error) return error;
          this.resume();
          return null;
        };
        _proto.resumeExternal = function resumeExternal() {
          this.resume();
        };
        _proto.leaveExternal = function leaveExternal() {
          this.leave();
        };
        _proto.endExternal = function endExternal() {
          this.end(true);
        };
        _proto.retryExternal = function retryExternal() {
          var error = this.transact(function (b) {
            return b.retryDungeon(Date.now());
          });
          if (!error) this.resume();
          return error;
        };
        _proto.exitExternal = function exitExternal() {
          var _this$view;
          var error = this.transact(function (b) {
            return b.exitDungeon();
          });
          if (error) return error;
          this.close();
          (_this$view = this.view) == null || _this$view.destroy();
          this.view = null;
          this.fightLayer = null;
          this.battle = null;
          this.finishing = false;
          this.render();
          return null;
        };
        _proto.formationExternal = function formationExternal(ids) {
          if (!this.battle) return '没有进行中的战斗';
          var draft = SquadBattleModel.restore(this.battle.snapshot()),
            error = draft.setBattleFormation(ids);
          if (error) return error;
          var snapshot = draft.snapshot();
          snapshot.version = 9;
          delete snapshot.dungeon;
          var failure = this.transact(function (b) {
            if (!b.dungeon.run || b.dungeon.run.receipt) return '挑战已结束';
            b.dungeon.run.battle = snapshot;
            return null;
          });
          if (failure) return failure;
          this.battle = draft;
          this.view.refreshFormation();
          this.view.useExternalPresentation();
          return null;
        };
        function DungeonPage(parent, art, nav, bag, portraits, monsters, yard, navigate, model, mutate, battleArt, save) {
          this.externalUI = false;
          this.externalForest = null;
          this.node = void 0;
          this.content = null;
          this.modal = null;
          this.tab = 0;
          this.difficulty = 0;
          this.selected = 0;
          this.stamina = void 0;
          this.recovery = void 0;
          this.remaining = void 0;
          this.gold = void 0;
          this.message = null;
          this.battle = null;
          this.fightLayer = null;
          this.view = null;
          this.clock = 0;
          this.finishing = false;
          this.finishDelay = 0;
          this.mutating = false;
          this.choosingFormation = false;
          this.art = art;
          this.nav = nav;
          this.bag = bag;
          this.portraits = portraits;
          this.monsters = monsters;
          this.yard = yard;
          this.navigate = navigate;
          this.model = model;
          this.mutate = mutate;
          this.battleArt = battleArt;
          this.save = save;
          this.node = modalNode(parent, 'Dungeon page', 0, 0, 887, 1774);
          this.render();
          this.node.active = false;
        }
        _proto.transact = function transact(fn) {
          this.mutating = true;
          try {
            return this.mutate(fn);
          } finally {
            this.mutating = false;
          }
        };
        _proto.image = function image(p, t, r, x, y, w, h) {
          return modalImage(p, t, r, x, y, w, h);
        };
        _proto.text = function text(p, t, x, y, w, h, size) {
          if (size === void 0) {
            size = 28;
          }
          return modalText(p, t, x, y, w, h, size);
        };
        _proto.scene = function scene(p, id, x, y, w, h) {
          var index = id < 4 ? id : id === 4 ? 3 : 2;
          return this.image(p, this.art, new Rect(38, [280, 590, 898, 1190][index], 390, 260), x, y, w, h);
        };
        _proto.close = function close() {
          var _this$modal;
          (_this$modal = this.modal) == null || _this$modal.destroy();
          this.modal = null;
          this.message = null;
        };
        _proto.refresh = function refresh() {
          this.close();
          this.render();
          if (this.model().dungeon.run) this.resume();
        };
        _proto.info = function info(title, body) {
          var _this = this;
          this.close();
          var v = new ModalView(this.node, title, 820, function () {
            return _this.close();
          });
          this.modal = v.layer;
          this.text(v.card, body, 0, -15, 680, 300, 30);
        };
        _proto.render = function render() {
          var _this$content,
            _this2 = this;
          (_this$content = this.content) == null || _this$content.destroy();
          var p = this.content = modalNode(this.node, 'Dungeon content', 0, 0, 887, 1774);
          modalPanel(p, 0, 0, 887, 1774, '#FBE6D0', 0);
          this.image(p, this.yard, new Rect(0, 0, this.yard.width, 250), 0, 812, 887, 150);
          modalPanel(p, -350, 831, 160, 65, '#FFF4DF', 32);
          this.text(p, '副本', -350, 831, 150, 60, 42);
          modalPanel(p, -117, 831, 260, 65, '#FFF4DF', 32);
          this.gold = this.text(p, '● ' + this.model().gold, -117, 831, 240, 60, 30);
          modalPanel(p, -310, 749, 240, 55, '#FFF5E4', 26);
          this.stamina = this.text(p, 'ϟ 120/120', -310, 749, 235, 54, 31);
          this.recovery = this.text(p, '', -23, 749, 320, 54, 26);
          ['资源副本', '无尽挑战', '每日副本'].forEach(function (t, i) {
            return modalButton(p, t, -290 + i * 290, 662, 280, 82, function () {
              _this2.tab = i;
              _this2.render();
            }, i === _this2.tab ? 'gold' : 'peach');
          });
          this.remaining = this.text(p, '', 0, 594, 800, 40, 24);
          var viewport = modalNode(p, 'Dungeon vertical scroll', 0, -54, 850, 1230);
          viewport.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
          var ids = this.tab === 0 ? [0, 1, 2, 3] : this.tab === 1 ? [5] : [4];
          var h = Math.max(1230, ids.length * 288 + 20),
            content = modalNode(viewport, 'Dungeon cards', 0, 615 - h / 2, 840, h);
          var scroll = viewport.addComponent(ScrollView);
          scroll.content = content;
          scroll.horizontal = false;
          scroll.vertical = true;
          scroll.inertia = true;
          ids.forEach(function (id, i) {
            var y = h / 2 - 148 - i * 288,
              card = modalPanel(content, 0, y, 824, 272, '#FFF0DF', 30);
            _this2.scene(card, id, -218, 0, 360, 252);
            var cfg = DUNGEONS[id];
            var name = cfg.name + (id === 5 ? ' · 最佳' + (_this2.model().dungeon.floor - 1) + '关' : '');
            _this2.text(card, name, 175, 91, 420, 56, 36);
            _this2.text(card, cfg.drop, 175, 40, 420, 40, 26);
            _this2.rewardIcons(card, id, 0, 135, -15, 72);
            _this2.text(card, 'ϟ 消耗体力', 66, -108, 210, 45, 25);
            modalButton(card, '查看', 286, -96, 180, 58, function () {
              return _this2.challenge(id);
            });
          });
          this.text(p, '点击副本选择难度', 0, -709, 800, 40, 26);
          drawNavigation(p, this.nav, this.bag, 4, function (i) {
            return _this2.navigate(['hero', 'recruit', 'adventure', 'bag', 'dungeon'][i]);
          });
          this.sync();
          if (this.externalUI) p.active = false;
          if (this.model().dungeon.run) {
            modalButton(p, this.model().dungeon.run.receipt ? '查看战斗结算' : '继续进行中的挑战', 0, -709, 500, 56, function () {
              return _this2.resume();
            });
          }
        };
        _proto.rewardIcons = function rewardIcons(p, id, difficulty, x, y, size) {
          var _this3 = this;
          if (size === void 0) {
            size = 100;
          }
          var reward = dungeonReward(id, difficulty, 1),
            items = id === 0 ? ['金币'] : id === 1 ? ['经验'] : id === 2 ? ['强化石'] : id === 3 ? ['装备'] : ['金币', '经验', '强化石'];
          items.forEach(function (name, i) {
            var xx = x + (i - (items.length - 1) / 2) * (size + 28);
            if (name === '装备') {
              [0, 1, 3].forEach(function (slot, j) {
                var g = generateGear(j + 1, reward.level);
                g.slot = slot;
                g.quality = [3, 2, 1][j];
                gearTile(p, _this3.bag, g, slot, xx + (j - 1) * (size + 12), y, size);
              });
            } else {
              var rect = name === '金币' ? new Rect(465, 382, 110, 75) : name === '经验' ? new Rect(465, 698, 110, 75) : new Rect(465, 1000, 110, 75);
              modalPanel(p, xx, y, size, size, '#61BCE8', 14);
              _this3.image(p, _this3.art, rect, xx, y + 6, size, size * .7);
              var v = name === '金币' ? reward.gold : name === '经验' ? reward.experience : reward.materials;
              _this3.text(p, '×' + v, xx, y - size / 2 - 17, size + 40, 34, 22);
            }
          });
        };
        _proto.challenge = function challenge(id) {
          var _this4 = this;
          if (this.model().dungeon.run) {
            this.resume();
            return;
          }
          this.selected = id;
          this.close();
          var v = new ModalView(this.node, '副本挑战', 1420, function () {
            return _this4.close();
          });
          this.modal = v.layer;
          var p = v.card,
            d = this.model().dungeon;
          this.scene(p, id, -210, 397, 270, 174);
          this.text(p, DUNGEONS[id].name, 135, 452, 430, 58, 39);
          this.text(p, id === 4 ? '每日副本 · 10波小怪＋Boss' : id === 5 ? '无限关卡 · 全队阵亡结束' : '10波小怪＋Boss波', 135, 394, 430, 50, 28);
          this.text(p, id === 4 ? '今日剩余挑战 ' + (2 - d.dailyUsed) + '/2' : '挑战失败不返还消耗', 135, 340, 430, 46, 25);
          modalSection(p, '选择难度', 248);
          DIFFICULTIES.forEach(function (name, i) {
            return modalButton(p, name, -230 + i * 230, 169, 210, 64, function () {
              _this4.difficulty = i;
              _this4.challenge(id);
            }, i === _this4.difficulty ? 'gold' : 'peach');
          });
          modalRow(p, '⚑', '推荐等级', 'Lv.' + [1, 8, 15][this.difficulty], 83);
          modalSection(p, id === 5 ? '每通关1关奖励' : '胜利奖励预览', -4);
          this.rewardIcons(p, id, this.difficulty, 0, -105, 100);
          modalSection(p, '出战队伍', -227);
          this.model().formation.forEach(function (hero, i) {
            var x = (i - (_this4.model().formation.length - 1) / 2) * 180,
              t = _this4.portraits[hero];
            modalPanel(p, x, -326, 140, 145, '#F8DCB9', 20);
            _this4.image(p, t, new Rect(0, 0, t.width, t.height), x, -310, 136, 136);
            _this4.text(p, 'Lv.' + _this4.model().heroes[hero].level, x, -406, 160, 38, 25);
          });
          var energy = this.text(p, 'ϟ 当前体力 ' + d.stamina + '/120 · 每6分钟恢复1点', 0, -468, 690, 44, 25);
          var cost = DUNGEON_CONFIG.costs[this.difficulty];
          modalButton(p, '开始挑战 · ϟ ' + cost, 0, -584, 480, 87, function () {
            var error = _this4.transact(function (b) {
              return b.startDungeon(id, _this4.difficulty, Date.now());
            });
            if (error) {
              energy.string = error;
              return;
            }
            _this4.close();
            _this4.resume();
          });
          this.message = energy;
        };
        _proto.resume = function resume() {
          var r = this.model().dungeon.run;
          if (!r) return;
          this.close();
          this.battle = SquadBattleModel.restore(r.battle);
          if (!this.battle) {
            this.info('挑战异常', '无法恢复战斗，请结束本次挑战');
            return;
          }
          this.buildFight();
          this.finishing = false;
          this.finishDelay = 0;
          if (r.receipt) this.resultDialog();else if (this.battle.result !== 'fighting') this.end(false);
        };
        _proto.buildFight = function buildFight() {
          var _this$view2,
            _this5 = this;
          var r = this.model().dungeon.run;
          (_this$view2 = this.view) == null || _this$view2.destroy();
          this.view = new BattleView(this.node, function () {
            return _this5.battle;
          }, this.battleArt, {
            title: DUNGEONS[r.id].name,
            dungeon: true,
            subtitle: function subtitle() {
              return DIFFICULTIES[r.difficulty] + (r.id === 5 ? ' · 无尽挑战' : '');
            },
            onChange: function onChange() {
              _this5.persistBattle();
              _this5.save();
            },
            onFormation: function onFormation() {
              return _this5.formation();
            },
            navigate: function navigate(i) {
              var _this5$battle;
              if (((_this5$battle = _this5.battle) == null ? void 0 : _this5$battle.result) !== 'fighting') {
                _this5.resultDialog();
                return;
              }
              _this5.leave();
              _this5.navigate(['hero', 'recruit', 'adventure', 'bag', 'dungeon'][i]);
            },
            onLeave: function onLeave() {
              return _this5.leave();
            },
            onEnd: function onEnd() {
              return _this5.end(true);
            }
          });
          this.fightLayer = this.view.root;
          if (this.externalUI) this.view.useExternalPresentation(this.externalForest || undefined);
        };
        _proto.formation = function formation() {
          var _this6 = this;
          if (!this.battle) return;
          if (this.battle.result !== 'fighting') {
            this.resultDialog();
            return;
          }
          this.close();
          this.choosingFormation = true;
          this.modal = formationModal(this.fightLayer, this.battle, this.portraits, function (ids) {
            var draft = SquadBattleModel.restore(_this6.battle.snapshot()),
              error = draft.setBattleFormation(ids);
            if (error) return error;
            var snapshot = draft.snapshot();
            snapshot.version = 9;
            delete snapshot.dungeon;
            var failure = _this6.transact(function (b) {
              if (!b.dungeon.run || b.dungeon.run.receipt) return '挑战已结束';
              b.dungeon.run.battle = snapshot;
              return null;
            });
            if (failure) return failure;
            _this6.battle = draft;
            _this6.view.refreshFormation();
            return null;
          }, function () {
            _this6.choosingFormation = false;
            _this6.close();
            if (_this6.battle) {
              _this6.persistBattle();
              _this6.save();
            }
          }, true);
        };
        _proto.leave = function leave() {
          var _this$battle, _this$view4;
          if (((_this$battle = this.battle) == null ? void 0 : _this$battle.result) !== 'fighting') {
            this.resultDialog();
            return;
          }
          this.persistBattle();
          if (!this.save()) {
            var _this$view3;
            (_this$view3 = this.view) == null || _this$view3.toast('保存失败，暂不离开');
            return;
          }
          this.close();
          (_this$view4 = this.view) == null || _this$view4.destroy();
          this.view = null;
          this.fightLayer = null;
          this.battle = null;
          this.render();
        };
        _proto.persistBattle = function persistBattle() {
          if (this.battle && this.model().dungeon.run) {
            var s = this.battle.snapshot();
            s.version = 9;
            delete s.dungeon;
            this.model().dungeon.run.battle = s;
          }
        };
        _proto.end = function end(stop) {
          var _this$model$dungeon$r;
          if (!this.battle) return;
          if ((_this$model$dungeon$r = this.model().dungeon.run) != null && _this$model$dungeon$r.receipt) {
            this.resultDialog();
            return;
          }
          if (stop && this.battle.result === 'fighting') {
            this.battle.result = 'defeat';
            this.battle.paused = false;
          }
          this.persistBattle();
          var error = this.transact(function (b) {
            return b.settleDungeon();
          });
          if (error) {
            var _this$view5;
            (_this$view5 = this.view) == null || _this$view5.toast(error + '，点击结束挑战可重试');
            this.finishing = false;
            return;
          }
          this.finishing = true;
          this.resultDialog();
        };
        _proto.resultDialog = function resultDialog() {
          var _this7 = this;
          if (this.externalUI) return;
          var r = this.model().dungeon.run,
            b = this.battle;
          if (!r || !b) return;
          if (!r.receipt) {
            if (b.result !== 'fighting') this.end(false);
            return;
          }
          this.close();
          var win = b.result === 'victory',
            reward = r.receipt,
            reason = b.party.every(function (h) {
              return h.hp <= 0;
            }) ? '全队阵亡' : '主动结束';
          var v = new ModalView(this.fightLayer, r.id === 5 ? '无尽结算' : win ? '挑战胜利' : '挑战失败', 1480, function () {
            return _this7.close();
          });
          this.modal = v.layer;
          var p = v.card;
          this.text(p, DUNGEONS[r.id].name + ' · ' + DIFFICULTIES[r.difficulty], 0, 510, 690, 58, 38);
          this.text(p, (win ? '全部波次已完成' : reason) + ' · 已通关 ' + reward.cleared + (r.id === 5 ? ' 关' : ' / ' + (DUNGEON_CONFIG.mobWaves + 1) + ' 波'), 0, 446, 700, 48, 27);
          this.text(p, '用时 ' + Math.floor(b.elapsed) + '秒 · 击败 ' + b.kills + ' 只 · 行动 ' + b.actions + '次', 0, 390, 700, 44, 25);
          modalSection(p, '实际获得 · 已保存', 318);
          modalRow(p, '●', '金币', '+' + reward.gold, 248);
          modalRow(p, '✦', '每位已拥有英雄经验', '+' + reward.experience, 184);
          modalRow(p, '◆', '强化材料', '+' + reward.materials, 120);
          modalRow(p, '▣', '装备入包 / 自动分解', reward.gear + '件 / ' + reward.salvaged + '件', 56);
          modalSection(p, '战斗统计', -20);
          this.text(p, '英雄                 输出伤害            治疗量', 0, -85, 700, 45, 25);
          var heroes = b.heroes.map(function (h, id) {
            return {
              h: h,
              id: id
            };
          }).filter(function (x) {
            return b.formation.indexOf(x.id) >= 0 || x.h.damage > 0 || x.h.healing > 0;
          });
          heroes.forEach(function (_ref, i) {
            var h = _ref.h,
              id = _ref.id;
            var y = -145 - i * 58;
            _this7.text(p, HERO_CONFIG[id].name, -230, y, 190, 43, 28);
            _this7.text(p, String(h.damage), 22, y, 230, 43, 27);
            _this7.text(p, String(h.healing), 240, y, 185, 43, 27);
          });
          this.text(p, '总输出 ' + b.damage + ' · 总治疗 ' + b.heroes.reduce(function (n, h) {
            return n + h.healing;
          }, 0) + ' · 总承伤 ' + b.received, 0, -395, 700, 45, 25);
          var message = this.text(p, '再次挑战重新消耗体力，每日副本计入当日次数。', 0, -457, 700, 60, 24);
          modalButton(p, '退出', -175, -610, 300, 80, function () {
            var _this7$view;
            var error = _this7.transact(function (m) {
              return m.exitDungeon();
            });
            if (error) {
              message.string = error;
              return;
            }
            _this7.close();
            (_this7$view = _this7.view) == null || _this7$view.destroy();
            _this7.view = null;
            _this7.fightLayer = null;
            _this7.battle = null;
            _this7.finishing = false;
            _this7.render();
          }, 'peach');
          modalButton(p, '再次挑战', 175, -610, 300, 80, function () {
            var error = _this7.transact(function (m) {
              return m.retryDungeon(Date.now());
            });
            if (error) {
              message.string = error;
              return;
            }
            _this7.resume();
          });
        };
        _proto.sync = function sync() {
          var d = this.model().dungeon;
          this.stamina.string = 'ϟ ' + d.stamina + '/120';
          this.gold.string = '● ' + this.model().gold;
          var seconds = Math.max(0, Math.ceil((d.anchor + DUNGEON_CONFIG.recoverMs - d.clock) / 1000));
          this.recovery.string = d.stamina === 120 ? '体力已满' : '下次恢复 ' + ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + seconds % 60).slice(-2);
          this.remaining.string = this.tab === 2 ? '今日剩余挑战 ' + (2 - d.dailyUsed) + '/2 · 本地零点重置' : this.tab === 1 ? '最佳通关 ' + (d.floor - 1) + ' 关 · 入场扣体力，阵亡结算' : '体力随时间恢复 · 挑战前选择难度';
        };
        _proto.update = function update(dt) {
          var _this$view6;
          this.sync();
          if (!this.battle || !this.fightLayer || this.finishing || this.choosingFormation) return;
          (_this$view6 = this.view) == null || _this$view6.update(dt);
          this.clock += dt;
          if (this.clock >= 1) {
            this.clock = 0;
            this.persistBattle();
          }
          if (this.battle.result !== 'fighting') {
            this.finishDelay += Math.min(dt, .1);
            if (this.finishDelay >= .6) this.end(false);
          }
        };
        _proto.beforeSave = function beforeSave() {
          if (!this.mutating) this.persistBattle();
        };
        _createClass(DungeonPage, [{
          key: "activeBattle",
          get: function get() {
            return this.battle;
          }
        }, {
          key: "activeView",
          get: function get() {
            return this.view;
          }
        }]);
        return DungeonPage;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EquipmentModal.ts", ['cc', './SquadBattleModel.ts', './GearView.ts', './ModalView.ts'], function (exports) {
  var cclegacy, Node, gearName, QUALITY_NAMES, EQUIPMENT_PARTS, gearStats, gearTile, modalText, modalPanel, modalNode, modalIcon, modalSection, modalRow;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
    }, function (module) {
      gearName = module.gearName;
      QUALITY_NAMES = module.QUALITY_NAMES;
      EQUIPMENT_PARTS = module.EQUIPMENT_PARTS;
      gearStats = module.gearStats;
    }, function (module) {
      gearTile = module.gearTile;
    }, function (module) {
      modalText = module.modalText;
      modalPanel = module.modalPanel;
      modalNode = module.modalNode;
      modalIcon = module.modalIcon;
      modalSection = module.modalSection;
      modalRow = module.modalRow;
    }],
    execute: function () {
      exports({
        equipmentHeader: equipmentHeader,
        equipmentStats: equipmentStats
      });
      cclegacy._RF.push({}, "1d505kwrWRNVIy/hhLlv7q1", "EquipmentModal", undefined);
      function equipmentHeader(card, atlas, gear, y, onLock) {
        gearTile(card, atlas, gear, gear.slot, -235, y, 172);
        modalText(card, gearName(gear), 83, y + 56, 420, 57, 35);
        var q = modalPanel(card, 80, y - 3, 330, 48, '#F3D4AD', 24);
        modalText(q, QUALITY_NAMES[gear.quality] + ' · ' + EQUIPMENT_PARTS[gear.slot], 0, 0, 320, 44, 27);
        modalText(card, 'Lv.' + gear.level + ' · 强化 +' + (gear.enhancement || 0), 80, y - 60, 380, 45, 27);
        if (onLock) {
          var lock = modalNode(card, 'Toggle equipment lock', 318, y - 60, 72, 72);
          modalIcon(lock, gear.locked ? 5 : 6, 0, 0, 58);
          lock.on(Node.EventType.TOUCH_END, onLock);
        }
      }
      function equipmentStats(card, gear, sectionY) {
        modalSection(card, '装备属性', sectionY);
        var stats = gearStats(gear);
        ['hp', 'attack', 'defense', 'power'].forEach(function (key, i) {
          return modalRow(card, ['♥', '⚔', '◈', '✦'][i], ['生命', '攻击', '防御', '技能效果'][i], '+' + stats[key], sectionY - 70 - i * 60);
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FormationModal.ts", ['cc', './SquadBattleModel.ts', './ModalView.ts'], function (exports) {
  var cclegacy, Node, Rect, HERO_CONFIG, ModalView, modalNode, modalSection, modalPanel, modalText, modalButton, modalImage;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Rect = module.Rect;
    }, function (module) {
      HERO_CONFIG = module.HERO_CONFIG;
    }, function (module) {
      ModalView = module.ModalView;
      modalNode = module.modalNode;
      modalSection = module.modalSection;
      modalPanel = module.modalPanel;
      modalText = module.modalText;
      modalButton = module.modalButton;
      modalImage = module.modalImage;
    }],
    execute: function () {
      exports('formationModal', formationModal);
      cclegacy._RF.push({}, "8937550oHxBVqErrBtFzMIf", "FormationModal", undefined);
      /** Shared draft picker. Closing never applies a draft. */
      function formationModal(parent, model, portraits, save, onClose, combat) {
        if (combat === void 0) {
          combat = false;
        }
        var v = new ModalView(parent, '队伍编队', 1180, onClose);
        var draft = model.formation.slice();
        var rows = modalNode(v.card, 'Formation draft', 0, 0, 760, 900);
        var face = function face(p, id, x, y, size) {
          var t = portraits[id];
          modalImage(p, t, new Rect(0, 0, t.width, t.height), x, y, size, size);
        };
        var draw = function draw() {
          rows.children.forEach(function (n) {
            return n.active = false;
          });
          rows.destroyAllChildren();
          modalSection(rows, '当前上阵', 365);
          var _loop = function _loop(slot) {
            var id = draft[slot],
              x = -225 + slot * 225,
              n = modalPanel(rows, x, 240, 200, 180, '#FBE1C2', 24);
            if (id !== undefined) {
              face(n, id, 0, 10, 145);
              modalText(n, HERO_CONFIG[id].name, 0, -62, 180, 42, 25);
              n.on(Node.EventType.TOUCH_END, function () {
                draft.splice(slot, 1);
                draw();
              });
            } else modalText(n, '＋', 0, 0, 160, 100, 60, '#B49770');
            modalText(rows, slot === 0 ? '前排' : '后排', x, 128, 190, 42, 25);
          };
          for (var slot = 0; slot < 3; slot++) {
            _loop(slot);
          }
          modalSection(rows, '可选英雄', 45);
          HERO_CONFIG.forEach(function (hero, id) {
            var owned = model.owns(id),
              slot = draft.indexOf(id),
              x = -265 + id * 176,
              n = modalPanel(rows, x, -75, 160, 145, slot >= 0 ? '#FFDA76' : '#FBE1C2', 20);
            if (owned) face(n, id, 0, 10, 110);
            modalText(n, owned ? hero.name : '未招募', 0, -50, 150, 38, 23);
            if (slot >= 0) modalText(n, '✓', 55, 48, 42, 36, 27);
            if (combat && owned && model.heroes[id].hp === 0) modalText(n, '已阵亡', 0, 48, 150, 38, 23);
            n.on(Node.EventType.TOUCH_END, function () {
              if (!owned) return;
              if (slot >= 0) draft.splice(slot, 1);else if (draft.length < 3) draft.push(id);
              draw();
            });
          });
          var hint = modalText(rows, combat ? '最多3位不重复英雄，第一位为前排。\n移除后重新选择可调整顺序。\n保留各自生命、冷却和本波敌人，不复活。' : '最多上阵3位，同一英雄不能重复。\n满员请先移除一位；第一位为前排。\n保存变更后重新挑战当前波。', 0, -260, 680, 145, 26);
          modalButton(rows, '保存阵容', 0, -460, 390, 80, function () {
            var error = save(draft);
            if (error) hint.string = error;else onClose();
          });
        };
        draw();
        return v.layer;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GearView.ts", ['cc', './SquadBattleModel.ts'], function (exports) {
  var cclegacy, Node, Layers, UITransform, SpriteFrame, Rect, Sprite, Color, Graphics, Label, GEAR_ART, EQUIPMENT_PARTS;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      SpriteFrame = module.SpriteFrame;
      Rect = module.Rect;
      Sprite = module.Sprite;
      Color = module.Color;
      Graphics = module.Graphics;
      Label = module.Label;
    }, function (module) {
      GEAR_ART = module.GEAR_ART;
      EQUIPMENT_PARTS = module.EQUIPMENT_PARTS;
    }],
    execute: function () {
      exports({
        drawNavigation: drawNavigation,
        gearTile: gearTile
      });
      cclegacy._RF.push({}, "8b762OLYkJJmonWE7BG77rJ", "GearView", undefined);
      var GEAR_COLORS = exports('GEAR_COLORS', ['#B8B6B3', '#79C443', '#54BBEF', '#BD78DD', '#FFD34D']);
      function gearTile(parent, atlas, gear, slot, x, y, size, owner) {
        var _gear$id;
        if (size === void 0) {
          size = 146;
        }
        if (owner === void 0) {
          owner = '';
        }
        var n = new Node('Gear ' + ((_gear$id = gear == null ? void 0 : gear.id) != null ? _gear$id : 'empty'));
        n.parent = parent;
        n.layer = Layers.Enum.UI_2D;
        n.setPosition(x, y);
        n.addComponent(UITransform).setContentSize(size, size);
        var box = function box(x, y, w, h, color) {
          var q = new Node('Tile background');
          q.parent = n;
          q.layer = Layers.Enum.UI_2D;
          q.setPosition(x, y);
          q.addComponent(UITransform).setContentSize(w, h);
          var g = q.addComponent(Graphics);
          g.fillColor = new Color().fromHEX(color);
          g.roundRect(-w / 2, -h / 2, w, h, Math.min(14, h / 2));
          g.fill();
        };
        var text = function text(s, x, y, w, font, color) {
          if (color === void 0) {
            color = '#FFFFFF';
          }
          var q = new Node(s);
          q.parent = n;
          q.layer = Layers.Enum.UI_2D;
          q.setPosition(x, y);
          q.addComponent(UITransform).setContentSize(w, 34);
          var l = q.addComponent(Label);
          l.string = s;
          l.fontFamily = 'Microsoft YaHei';
          l.fontSize = font;
          l.isBold = true;
          l.color = new Color().fromHEX(color);
          l.horizontalAlign = Label.HorizontalAlign.CENTER;
          l.verticalAlign = Label.VerticalAlign.CENTER;
          l.overflow = Label.Overflow.SHRINK;
          l.enableOutline = true;
          l.outlineColor = new Color().fromHEX('#775337');
          l.outlineWidth = 1.5;
        };
        if (!gear) {
          box(0, 0, size, size, '#C9BBAB');
          text(EQUIPMENT_PARTS[slot], 0, 0, size, 26);
          return n;
        }
        var color = GEAR_COLORS[gear.quality];
        box(0, 0, size, size, color);
        var exact = GEAR_ART.findIndex(function (a) {
            return a[0] === gear.slot && a[1] === gear.quality;
          }),
          index = exact >= 0 ? exact : GEAR_ART.findIndex(function (a) {
            return a[0] === gear.slot;
          }),
          row = Math.floor(index / 5),
          col = index % 5;
        var pic = new Node('Equipment artwork');
        pic.parent = n;
        pic.layer = Layers.Enum.UI_2D;
        pic.addComponent(UITransform).setContentSize(size - 4, size - 4);
        var f = new SpriteFrame();
        f.texture = atlas;
        f.rect = new Rect([50, 225, 398, 570, 742][col], [432, 595, 752, 907][row], [162, 160, 158, 158, 162][col], row === 0 ? 146 : row === 1 ? 139 : row === 2 ? 140 : 134);
        var sp = pic.addComponent(Sprite);
        sp.sizeMode = Sprite.SizeMode.CUSTOM;
        sp.spriteFrame = f;
        // Replace baked concept-image badges with actual inventory state.
        box(0, -size / 2 + 19, size - 6, 36, color);
        text('Lv.' + gear.level + (gear.enhancement ? ' +' + gear.enhancement : ''), 0, -size / 2 + 19, size - 12, 25);
        box(size / 2 - 22, size / 2 - 21, 38, 38, color);
        if (gear.locked) text('锁', size / 2 - 22, size / 2 - 21, 35, 23);
        if (owner) {
          box(-size / 2 + 36, size / 2 - 17, 68, 30, '#FFF0CF');
          text(owner, -size / 2 + 36, size / 2 - 17, 64, 21, '#704124');
        }
        return n;
      }

      // Reuse existing full navigation buttons, keeping one layout and active state.
      function drawNavigation(parent, atlas, bagAtlas, selected, onSelect) {
        var root = new Node('Navigation');
        root.parent = parent;
        root.layer = Layers.Enum.UI_2D;
        root.addComponent(UITransform).setContentSize(887, 150);
        root.setPosition(0, -812);
        var labels = ['英雄', '招募', '冒险', '背包', '副本'];
        var regions = [[10, 1648, 177, 120], [190, 1648, 170, 120], [362, 1648, 169, 120], [534, 1648, 170, 120], [707, 1648, 170, 120]];
        labels.forEach(function (name, i) {
          var n = new Node('Nav ' + name);
          n.parent = root;
          n.layer = Layers.Enum.UI_2D;
          n.setPosition(-348 + i * 174, 0);
          n.addComponent(UITransform).setContentSize(170, 130);
          var f = new SpriteFrame();
          var r = i === 0 && selected !== 0 ? [15, 1494, 182, 130] : regions[i];
          f.texture = i === 0 && selected !== 0 ? bagAtlas : atlas;
          f.rect = new Rect(r[0], r[1], r[2], r[3]);
          var sp = n.addComponent(Sprite);
          sp.sizeMode = Sprite.SizeMode.CUSTOM;
          sp.spriteFrame = f;
          if (i === selected && i !== 0) sp.color = new Color(255, 211, 114, 255);
          n.on(Node.EventType.TOUCH_END, function () {
            return onSelect(i);
          });
        });
        return root;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HeroPage.ts", ['cc', './FormationModal.ts', './EquipmentModal.ts', './ModalView.ts', './SquadBattleModel.ts', './GearView.ts'], function (exports) {
  var cclegacy, Node, Layers, UITransform, Graphics, Color, Label, SpriteFrame, Sprite, Rect, Mask, ScrollView, BlockInputEvents, formationModal, equipmentHeader, equipmentStats, inModal, modalButton, modalIcon, ModalView, modalPanel, modalSection, modalImage, modalRow, gearStats, TALENTS, STAR_CONFIG, SKILL_NAMES, SKILL_LEVELS, LEVEL_CAP, upgradeCost, QUALITY_NAMES, gearTile, drawNavigation;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Graphics = module.Graphics;
      Color = module.Color;
      Label = module.Label;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Rect = module.Rect;
      Mask = module.Mask;
      ScrollView = module.ScrollView;
      BlockInputEvents = module.BlockInputEvents;
    }, function (module) {
      formationModal = module.formationModal;
    }, function (module) {
      equipmentHeader = module.equipmentHeader;
      equipmentStats = module.equipmentStats;
    }, function (module) {
      inModal = module.inModal;
      modalButton = module.modalButton;
      modalIcon = module.modalIcon;
      ModalView = module.ModalView;
      modalPanel = module.modalPanel;
      modalSection = module.modalSection;
      modalImage = module.modalImage;
      modalRow = module.modalRow;
    }, function (module) {
      gearStats = module.gearStats;
      TALENTS = module.TALENTS;
      STAR_CONFIG = module.STAR_CONFIG;
      SKILL_NAMES = module.SKILL_NAMES;
      SKILL_LEVELS = module.SKILL_LEVELS;
      LEVEL_CAP = module.LEVEL_CAP;
      upgradeCost = module.upgradeCost;
      QUALITY_NAMES = module.QUALITY_NAMES;
    }, function (module) {
      gearTile = module.gearTile;
      drawNavigation = module.drawNavigation;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f14a6tEf0NN7Z66t5yyzL28", "HeroPage", undefined);
      var INK = '#704124',
        CREAM = '#FFF5E5';
      var HEROES = ['骑士', '法师', '牧师', '弓箭手'];
      var EQUIPMENT = ['武器', '戒指', '项链', '头盔', '衣服', '鞋子'];
      // Roster progression is independent of the three battle positions.
      var HeroPage = exports('HeroPage', /*#__PURE__*/function () {
        function HeroPage(parent, atlas, forest, actors, onAdventure, onBag, heroTextures, battleUI, progress, onUpgrade, model, mutate, bagAtlas, onRecruit, onDungeon) {
          this.node = void 0;
          this.selected = 0;
          this.balance = void 0;
          this.experienceLabel = void 0;
          this.experienceFill = void 0;
          this.upgradeButton = void 0;
          this.content = void 0;
          this.dialog = null;
          this.atlas = atlas;
          this.forest = forest;
          this.actors = actors;
          this.onAdventure = onAdventure;
          this.onBag = onBag;
          this.heroTextures = heroTextures;
          this.battleUI = battleUI;
          this.progress = progress;
          this.onUpgrade = onUpgrade;
          this.model = model;
          this.mutate = mutate;
          this.bagAtlas = bagAtlas;
          this.onRecruit = onRecruit;
          this.onDungeon = onDungeon;
          this.node = this.nodeAt(parent, 'Hero page', 0, 0, 887, 1774);
          this.render();
          this.node.active = false;
        }
        var _proto = HeroPage.prototype;
        _proto.nodeAt = function nodeAt(parent, name, x, y, w, h) {
          var n = new Node(name);
          n.layer = Layers.Enum.UI_2D;
          n.parent = parent;
          n.setPosition(x, y);
          n.addComponent(UITransform).setContentSize(w, h);
          return n;
        };
        _proto.panel = function panel(parent, x, y, w, h, color, r) {
          if (color === void 0) {
            color = CREAM;
          }
          if (r === void 0) {
            r = 25;
          }
          var n = this.nodeAt(parent, 'Panel', x, y, w, h),
            g = n.addComponent(Graphics);
          g.fillColor = new Color().fromHEX(color);
          g.roundRect(-w / 2, -h / 2, w, h, r);
          g.fill();
          return n;
        };
        _proto.text = function text(parent, _text, x, y, w, h, size, color) {
          if (size === void 0) {
            size = 28;
          }
          if (color === void 0) {
            color = INK;
          }
          var n = this.nodeAt(parent, _text, x, y, w, h),
            l = n.addComponent(Label);
          l.string = _text;
          l.fontFamily = 'Microsoft YaHei';
          l.isBold = true;
          l.fontSize = size;
          l.lineHeight = size * 1.4;
          l.color = new Color().fromHEX(color);
          l.horizontalAlign = Label.HorizontalAlign.CENTER;
          l.verticalAlign = Label.VerticalAlign.CENTER;
          l.overflow = Label.Overflow.SHRINK;
          return l;
        };
        _proto.sprite = function sprite(parent, t, rect, x, y, w, h) {
          var n = this.nodeAt(parent, 'Artwork', x, y, w, h),
            f = new SpriteFrame();
          f.texture = t;
          f.rect = rect;
          var s = n.addComponent(Sprite);
          s.sizeMode = Sprite.SizeMode.CUSTOM;
          s.spriteFrame = f;
          n.getComponent(UITransform).setContentSize(w, h);
          return n;
        };
        _proto.cut = function cut(sx, sy, sw, sh, x, y, w, h, parent) {
          if (w === void 0) {
            w = sw;
          }
          if (h === void 0) {
            h = sh;
          }
          if (parent === void 0) {
            parent = this.content;
          }
          return this.sprite(parent, this.atlas, new Rect(sx, sy, sw, sh), x, y, w, h);
        };
        _proto.button = function button(parent, text, x, y, w, h, fn, color) {
          if (color === void 0) {
            color = '#FFCE52';
          }
          if (inModal(parent)) return modalButton(parent, text, x, y, w, h, fn, color === '#E2D2B9' ? 'muted' : color === '#FFCE52' ? 'gold' : 'peach');
          var n = this.panel(parent, x, y, w, h, color, h / 2);
          this.text(n, text, 0, 0, w - 18, h - 6, 30);
          n.on(Node.EventType.TOUCH_END, fn);
          return n;
        };
        _proto.round = function round(n) {
          var u = n.getComponent(UITransform);
          var h = this.nodeAt(n.parent, 'Portrait mask', n.position.x, n.position.y, u.width, u.height);
          h.addComponent(Mask).type = Mask.Type.GRAPHICS_ELLIPSE;
          n.parent = h;
          n.setPosition(0, 0);
        };
        _proto.info = function info(title, body) {
          this.closeEquipment();
          var _this$equipmentLayer = this.equipmentLayer(title, 820),
            layer = _this$equipmentLayer.layer,
            card = _this$equipmentLayer.card;
          this.dialog = layer;
          modalIcon(card, 4, 0, 120, 90);
          this.text(card, body, 0, -80, 680, 260, 28);
        };
        _proto.closeEquipment = function closeEquipment() {
          var _this$dialog;
          (_this$dialog = this.dialog) == null || _this$dialog.destroy();
          this.dialog = null;
        };
        _proto.equipmentLayer = function equipmentLayer(title, height, parent) {
          var _this = this;
          if (parent === void 0) {
            parent = this.node;
          }
          var view;
          view = new ModalView(parent, title, height, function () {
            if (view.layer === _this.dialog) _this.closeEquipment();else view.layer.destroy();
          });
          return {
            layer: view.layer,
            card: view.card
          };
        };
        _proto.equipmentInfo = function equipmentInfo(slot) {
          var g = this.model().equipment(this.selected)[slot];
          this.closeEquipment();
          if (g) this.equipmentDetail(g.id);else this.equipmentPicker(slot);
        };
        _proto.equipmentPicker = function equipmentPicker(initialSlot) {
          var _this2 = this;
          var part = initialSlot,
            quality = -1;
          var _this$equipmentLayer2 = this.equipmentLayer('装备选择', 1430),
            layer = _this$equipmentLayer2.layer,
            card = _this$equipmentLayer2.card;
          this.dialog = layer;
          var body = null;
          var draw = function draw() {
            var _body;
            (_body = body) == null || _body.destroy();
            body = _this2.nodeAt(card, 'Equipment picker content', 0, -20, 780, 1180);
            var p = body,
              b = _this2.model();
            var items = b.inventory.filter(function (g) {
              return b.owner(g.id) < 0 && (part < 0 || g.slot === part) && (quality < 0 || g.quality === quality);
            }).slice().sort(function (a, b) {
              return b.quality - a.quality || b.level - a.level || b.id - a.id;
            });
            var viewport = _this2.nodeAt(p, 'Equipment selection scroll', 0, 95, 750, 850);
            viewport.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
            var list = _this2.nodeAt(viewport, 'Equipment choices', 0, 425, 750, Math.max(850, Math.ceil(items.length / 5) * 150 + 20));
            list.getComponent(UITransform).setAnchorPoint(.5, 1);
            var scroll = viewport.addComponent(ScrollView);
            scroll.content = list;
            scroll.horizontal = false;
            scroll.vertical = true;
            scroll.cancelInnerEvents = true;
            items.forEach(function (g, i) {
              var owner = b.owner(g.id),
                n = gearTile(list, _this2.bagAtlas, g, g.slot, -300 + i % 5 * 150, -80 - Math.floor(i / 5) * 150, 138, owner >= 0 ? HEROES[owner] : '');
              n.on(Node.EventType.TOUCH_END, function () {
                return _this2.equipmentDetail(g.id, layer, draw);
              });
            });
            for (var _i = items.length; _i < Math.max(15, Math.ceil(items.length / 5) * 5); _i++) _this2.panel(list, -300 + _i % 5 * 150, -80 - Math.floor(_i / 5) * 150, 138, 138, '#E8D7BD', 16);
            if (!items.length) _this2.text(viewport, '没有符合条件的装备\n可调整部位或品质筛选', 0, 180, 680, 110, 30, '#AA8060');
            _this2.text(p, '品阶', -310, -427, 100, 50, 29);
            _this2.button(p, (quality < 0 ? '全部' : QUALITY_NAMES[quality]) + ' ▾', -100, -427, 285, 65, function () {
              // Anchored select menu opens upward because this control sits at the bottom.
              // A transparent dismiss target blocks clicks through to the inventory beneath it.
              var dropdown = _this2.nodeAt(layer, 'Quality dropdown', 0, 0, 887, 1774);
              dropdown.addComponent(BlockInputEvents);
              dropdown.on(Node.EventType.TOUCH_END, function () {
                return dropdown.destroy();
              });
              var choices = _this2.panel(dropdown, -100, -214, 285, 390, '#E9CBA4', 18);
              choices.addComponent(BlockInputEvents);
              choices.on(Node.EventType.TOUCH_END, function (e) {
                return e.propagationStopped = true;
              });
              ['全部'].concat(QUALITY_NAMES).forEach(function (name, i) {
                return _this2.button(choices, name, 0, 160 - i * 64, 273, 60, function () {
                  quality = i - 1;
                  dropdown.destroy();
                  draw();
                }, quality === i - 1 ? '#FFCE52' : CREAM);
              });
            }, '#F4E2CA');
            _this2.text(p, items.length + '件', 290, -427, 130, 50, 29);
            var parts = [-1, 0, 3, 4, 5, 1, 2];
            var art = [[77, 376, 98, 85], [85, 550, 95, 87], [84, 725, 91, 85], [708, 375, 107, 84], [702, 550, 113, 83], [706, 727, 111, 79]];
            parts.forEach(function (slot, i) {
              var tab = _this2.panel(p, -324 + i * 108, -555, 100, 140, part === slot ? '#FFCE52' : '#F4E2CA', 18);
              if (slot < 0) {
                var icon = _this2.nodeAt(tab, 'All equipment icon', 0, 22, 64, 64),
                  g = icon.addComponent(Graphics);
                g.fillColor = new Color().fromHEX(INK);
                for (var _i2 = 0, _arr = [-27, 5]; _i2 < _arr.length; _i2++) {
                  var x = _arr[_i2];
                  for (var _i3 = 0, _arr2 = [-27, 5]; _i3 < _arr2.length; _i3++) {
                    var y = _arr2[_i3];
                    g.roundRect(x, y, 22, 22, 5);
                    g.fill();
                  }
                }
              } else {
                var _art$slot = art[slot],
                  _x = _art$slot[0],
                  _y = _art$slot[1],
                  w = _art$slot[2],
                  h = _art$slot[3];
                var _icon = _this2.cut(_x, _y, w, h, 0, 24, 72, 66, tab);
                _this2.round(_icon);
              }
              _this2.text(tab, slot < 0 ? '全部' : EQUIPMENT[slot], 0, -41, 96, 42, 27);
              tab.on(Node.EventType.TOUCH_END, function () {
                part = slot;
                draw();
              });
            });
          };
          draw();
        };
        _proto.equipmentDetail = function equipmentDetail(id, picker, refreshPicker) {
          var _this3 = this;
          var b = this.model(),
            g = b.inventory.find(function (g) {
              return g.id === id;
            });
          if (!g) return;
          var owner = b.owner(id),
            current = b.equipment(this.selected)[g.slot];
          var _this$equipmentLayer3 = this.equipmentLayer('装备详情', 1180, picker || this.node),
            layer = _this$equipmentLayer3.layer,
            card = _this$equipmentLayer3.card;
          if (!picker) this.dialog = layer;
          equipmentHeader(card, this.bagAtlas, g, 330);
          equipmentStats(card, g, 200);
          var values = gearStats(g),
            old = current ? gearStats(current) : {
              hp: 0,
              attack: 0,
              defense: 0,
              power: 0
            };
          var difference = function difference(key) {
            var n = values[key] - old[key];
            return (n >= 0 ? '+' : '') + n;
          };
          this.text(card, owner >= 0 ? '已穿戴：' + HEROES[owner] + ' · 卸下后回到背包' : '替换变化：生命 ' + difference('hp') + ' · 攻击 ' + difference('attack') + '\n防御 ' + difference('defense') + ' · 技能效果 ' + difference('power'), 0, -170, 690, 100, 27);
          this.text(card, owner < 0 ? '穿戴给：' + HEROES[this.selected] : '', 0, -252, 690, 45, 27);
          var result = this.text(card, '', 0, -350, 680, 70, 25, '#B45B38');
          this.button(card, owner >= 0 ? '卸下' : '穿戴', 0, -460, 360, 78, function () {
            if (_this3.model().owner(id) !== owner) {
              result.string = '装备归属已变化，请关闭后重试';
              return;
            }
            var error = _this3.mutate(function (b) {
              return b.equip(owner >= 0 ? owner : _this3.selected, owner >= 0 ? null : id, g.slot);
            });
            if (error) {
              result.string = error;
              return;
            }
            _this3.render();
            if (picker) {
              picker.setSiblingIndex(_this3.node.children.length - 1);
              layer.destroy();
              refreshPicker == null || refreshPicker();
            } else _this3.closeEquipment();
          });
        };
        _proto.talentDialog = function talentDialog(selected) {
          var _this4 = this;
          if (selected === void 0) {
            selected = 2;
          }
          var id = this.selected,
            b = this.model();
          if (!b.owns(id)) {
            this.info('天赋树', '请先招募该英雄');
            return;
          }
          this.closeEquipment();
          var _this$equipmentLayer4 = this.equipmentLayer('英雄天赋', 1260),
            layer = _this$equipmentLayer4.layer,
            card = _this$equipmentLayer4.card;
          this.dialog = layer;
          this.text(card, HEROES[id] + ' · Lv.' + b.heroes[id].level, 0, 365, 680, 55, 34);
          this.text(card, '可用天赋点 ' + b.talentPoints(id), 0, 305, 680, 48, 29);
          var positions = [[0, 200], [-190, 40], [190, 40], [190, -125]];
          var lines = this.nodeAt(card, 'Talent connections', 0, 0, 700, 450).addComponent(Graphics);
          lines.strokeColor = new Color().fromHEX('#D7AE68');
          lines.lineWidth = 5;
          for (var _i4 = 0, _arr3 = [[0, 1], [0, 2], [2, 3]]; _i4 < _arr3.length; _i4++) {
            var _arr3$_i = _arr3[_i4],
              a = _arr3$_i[0],
              z = _arr3$_i[1];
            lines.moveTo(positions[a][0], positions[a][1]);
            lines.lineTo(positions[z][0], positions[z][1]);
            lines.stroke();
          }
          TALENTS.forEach(function (c, j) {
            var _positions$j = positions[j],
              x = _positions$j[0],
              y = _positions$j[1],
              rank = b.heroes[id].talents[j],
              n = modalPanel(card, x, y, 170, 122, selected === j ? '#FFD464' : '#FBE1C2', 22);
            _this4.text(n, ['♥', '⚔', '✦', '◷'][j], -48, 15, 66, 60, 46);
            _this4.text(n, c.name, 22, 25, 104, 48, 24);
            _this4.text(n, rank + '/' + c.max, 22, -23, 110, 38, 25);
            n.on(Node.EventType.TOUCH_END, function () {
              return _this4.talentDialog(j);
            });
          });
          var c = TALENTS[selected],
            rank = b.heroes[id].talents[selected];
          modalSection(card, c.name, -235);
          this.text(card, c.description + '\n消耗 ' + c.cost + '点' + (selected === 3 ? ' · 需要技能强化1级' : ''), 0, -315, 680, 90, 26);
          this.button(card, '重置天赋', -177, -500, 290, 78, function () {
            var error = _this4.mutate(function (m) {
              return m.resetTalents(id);
            });
            if (error) {
              _this4.info('天赋重置', error);
              return;
            }
            _this4.render();
            _this4.talentDialog(selected);
          }, '#FFB98D');
          this.button(card, rank === c.max ? '已满级' : '学习节点', 177, -500, 290, 78, function () {
            var error = _this4.mutate(function (m) {
              return m.trainTalent(id, selected);
            });
            if (error) {
              _this4.info('天赋培养', error);
              return;
            }
            _this4.render();
            _this4.talentDialog(selected);
          }, rank === c.max ? '#E2D2B9' : '#FFCE52');
        };
        _proto.starDialog = function starDialog() {
          var _this5 = this;
          var id = this.selected,
            p = this.model().starPreview(id);
          if (!p) {
            this.info('英雄升星', '请先招募该英雄');
            return;
          }
          this.closeEquipment();
          var _this$equipmentLayer5 = this.equipmentLayer('英雄升星', 1110),
            layer = _this$equipmentLayer5.layer,
            card = _this$equipmentLayer5.card;
          this.dialog = layer;
          var max = p.stars === STAR_CONFIG.cap,
            t = this.heroTextures[id];
          modalImage(card, t, new Rect(0, 0, t.width, t.height), -235, 285, 160, 160);
          this.text(card, HEROES[id], 65, 320, 400, 55, 35);
          this.text(card, max ? '★★★★★ · 已满星' : p.stars + '星 → ' + (p.stars + 1) + '星', 65, 255, 400, 65, 37);
          this.text(card, '可用重复份数 ' + p.available + (max ? '' : ' / 需要 ' + p.cost + '份'), 0, 160, 680, 50, 29);
          modalSection(card, '提升预览', 80);
          var values = [[p.before.hp, p.after.hp], [p.before.attack, p.after.attack], [p.before.power, p.after.power]];
          values.forEach(function (v, i) {
            return modalRow(card, ['♥', '⚔', '✦'][i], ['生命', '攻击', '招牌技能'][i], v[0] + (max ? '' : ' → ' + v[1]), 5 - i * 65);
          });
          this.text(card, '保留角色本体，只消耗同名英雄重复份数。\n每星基础生命/攻击+15%，招牌技能效果+25%。\n装备独立叠加；保持生命比例与战斗冷却。', 0, -240, 680, 140, 24);
          if (!max) this.button(card, p.available >= p.cost ? '升星 · 消耗' + p.cost + '份' : '份数不足', 0, -425, 390, 80, function () {
            var error = _this5.mutate(function (b) {
              return b.starUp(id);
            });
            if (error) {
              _this5.info('英雄升星', error);
              return;
            }
            _this5.render();
            _this5.starDialog();
          }, p.available >= p.cost ? '#FFCE52' : '#E2D2B9');
        };
        _proto.formationPicker = function formationPicker() {
          var _this6 = this;
          this.closeEquipment();
          this.dialog = formationModal(this.node, this.model(), this.heroTextures, function (ids) {
            return _this6.mutate(function (b) {
              return b.setFormation(ids);
            });
          }, function () {
            _this6.closeEquipment();
            _this6.render();
          });
        };
        _proto.skillDialog = function skillDialog(index) {
          var _this7 = this;
          var id = this.selected,
            b = this.model(),
            config = b.stats(id),
            open = b.unlocked(id, index),
            passive = index % 2 === 1;
          this.closeEquipment();
          var _this$equipmentLayer6 = this.equipmentLayer('技能详情', 1100),
            layer = _this$equipmentLayer6.layer,
            card = _this$equipmentLayer6.card;
          this.dialog = layer;
          if (id === 3) modalImage(card, this.bagAtlas, new Rect(405, 618, 120, 85), -235, 290, 150, 150);else modalImage(card, this.battleUI, new Rect([28, 316, 612][id], 1413, 120, 120), -235, 290, 150, 150);
          this.text(card, SKILL_NAMES[id][index], 85, 320, 415, 58, 35);
          this.text(card, (passive ? '被动' : '主动') + ' · ' + SKILL_LEVELS[index] + '级解锁', 85, 255, 415, 45, 28);
          var effect = index === 1 ? ['防御 +25', '主动技能效果 +15%', '主动治疗效果 +15%', '普攻攻击 +15%'][id] : index === 3 ? '两个主动技能效果 +20%（包含招牌技能升星加成）' : index === 0 ? id === 0 ? '获得护盾 ' + config.power : id === 2 ? '治疗生命比例最低的存活队友，最多 ' + config.power : '造成伤害 ' + config.power : id === 2 ? '治疗生命比例最低的存活队友，最多 ' + Math.round(config.power * 1.4) : '造成伤害 ' + Math.round(config.power * 1.4) + '，定向攻击' + (id === 0 ? '攻击最高的敌人' : '生命比例最低的敌人');
          modalSection(card, '技能效果', 155);
          this.text(card, effect, 0, 60, 680, 110, 29);
          modalRow(card, '✦', '解锁状态', open ? '已解锁' : '未解锁', -45);
          modalRow(card, '◷', '冷却', passive ? '自动生效' : (index === 0 ? config.cooldown : b.secondCooldown(id)) + '秒', -110);
          this.text(card, passive ? '解锁后自动生效，无需释放。' : '冷却仅在战斗中推进，非战斗期间暂停。\n可手动点击排队释放或开启自动技能。\n每次技能占用一次行动。' + (id === 2 ? '满血不释放。' : ''), 0, -225, 680, 120, 26);
          SKILL_LEVELS.forEach(function (lv, i) {
            var x = -255 + i * 170,
              n = modalPanel(card, x, -400, 148, 92, b.unlocked(id, i) ? '#FFDB7E' : '#DDD0BD', 18);
            _this7.text(n, i % 2 ? '被动' : '主动', 0, 14, 135, 36, 24);
            _this7.text(n, b.unlocked(id, i) ? '已解锁' : lv + '级解锁', 0, -23, 135, 32, 22);
            n.on(Node.EventType.TOUCH_END, function () {
              return _this7.skillDialog(i);
            });
          });
        };
        _proto.refresh = function refresh() {
          this.render();
        };
        _proto.refreshIncome = function refreshIncome() {
          var state = this.progress(),
            owned = this.model().owns(this.selected),
            level = state.levels[this.selected],
            max = level >= LEVEL_CAP,
            cost = upgradeCost(level),
            xp = state.experience[this.selected];
          this.balance.string = String(state.gold);
          this.experienceLabel.string = owned ? '经验 ' + xp + ' / ' + (max ? '满级' : cost) : '经验 —';
          var g = this.experienceFill;
          g.clear();
          if (owned && xp > 0) {
            var w = 380 * (max ? 1 : Math.min(1, xp / cost));
            g.fillColor = new Color().fromHEX('#FFCB4D');
            g.roundRect(-190, -8, Math.max(2, w), 16, Math.min(8, w / 2));
            g.fill();
          }
          this.upgradeButton.getComponent(Graphics).fillColor = new Color().fromHEX(owned && !max && xp >= cost ? '#FFCE52' : '#E2D2B9');
          var bg = this.upgradeButton.getComponent(Graphics);
          bg.clear();
          bg.roundRect(-133.5, -32, 267, 64, 32);
          bg.fill();
        };
        _proto.render = function render() {
          var _this$content,
            _this8 = this;
          (_this$content = this.content) == null || _this$content.destroy();
          this.content = this.nodeAt(this.node, 'Hero content', 0, 0, 887, 1774);
          var p = this.content;
          var owned = this.model().owns(this.selected),
            name = HEROES[this.selected],
            config = this.progress().stats[this.selected],
            level = this.progress().levels[this.selected];
          this.panel(p, 0, 0, 887, 1774, '#F8E6CF', 0);
          this.sprite(p, this.forest, new Rect(0, 0, this.forest.width, this.forest.height), 0, 439, 887, 896);
          this.cut(20, 17, 158, 66, -345, 837);
          this.panel(p, -145, 837, 188, 62);
          this.cut(204, 20, 52, 55, -207, 837);
          this.balance = this.text(p, String(this.progress().gold), -128, 837, 110, 52, 35);
          // Portrait tabs are individual click targets with a live selection highlight.
          var tabSources = [[24, 140, 215, 114], [246, 142, 197, 114], [450, 141, 200, 115], [655, 142, 215, 115]];
          tabSources.forEach(function (r, i) {
            var x = -330 + i * 220;
            var tab = _this8.panel(p, x, 680, 210, 94, i === _this8.selected ? '#FFCE52' : CREAM, 26);
            var t = _this8.heroTextures[i];
            var face = t ? _this8.sprite(tab, t, new Rect(0, 0, t.width, t.height), -52, 8, 108, 108) : _this8.cut(r[0] + 5, r[1], 108, 110, -52, 8, 103, 105, tab);
            _this8.round(face);
            _this8.text(tab, HEROES[i], 48, 0, 105, 55, 28);
            tab.on(Node.EventType.TOUCH_END, function () {
              if (_this8.selected !== i) {
                _this8.selected = i;
                _this8.render();
              }
            });
            if (i === _this8.selected) _this8.panel(p, x, 620, 162, 6, '#F3AC21', 3);
          });
          var copies = this.model().recruitment.counts[this.selected];
          this.text(p, owned ? name + ' · Lv.' + level : name + (copies ? ' · 已招募' : ' · 未招募'), 0, 589, 530, 65, 44);
          this.button(p, this.model().formation.indexOf(this.selected) >= 0 ? '已上阵 · 编队' : '上阵 / 编队', -325, 589, 190, 52, function () {
            return _this8.formationPicker();
          }, '#F4DEB7');
          for (var _i5 = 0; _i5 < 5; _i5++) this.cut(owned && _i5 < this.model().heroes[this.selected].stars ? 303 : 425, 334, 40, 40, -122 + _i5 * 42, 535, 40, 40);
          this.cut(533, 324, 62, 62, 120, 535).on(Node.EventType.TOUCH_END, function () {
            return _this8.starDialog();
          });
          var star = this.model().starPreview(this.selected);
          this.text(p, star ? star.stars === STAR_CONFIG.cap ? '已满星' : '升星 ' + star.available + ' / ' + star.cost + '份' : '未招募', 310, 589, 220, 45, 24);
          var roles = [['战士', '坦克', '输出'], ['法师', '输出'], ['牧师', '治疗'], ['弓箭手', '输出']][this.selected];
          var roleRow = this.nodeAt(p, 'Roles', 0, 478, 430, 45);
          roles.forEach(function (role, i) {
            var x = (i - (roles.length - 1) / 2) * 140;
            _this8.cut(role === '坦克' ? 394 : role === '输出' ? 514 : 275, 393, 36, 37, x - 42, 0, 32, 33, roleRow);
            _this8.text(roleRow, role, x + 12, 0, 91, 40, 28);
          });
          roleRow.on(Node.EventType.TOUCH_END, function () {
            return _this8.info('职业与定位', roles.join(' / ') + '\n职业决定技能特色，定位说明队伍职责。\n可选择至多三位不同英雄上阵，第一位为前排。');
          });
          var equipmentRegions = [[48, 345], [48, 518], [48, 691], [678, 345], [678, 518], [678, 691]];
          equipmentRegions.forEach(function (r, i) {
            var x = i < 3 ? -315 : 315,
              y = 465 - i % 3 * 173;
            var gear = owned ? _this8.model().equipment(_this8.selected)[i] : null;
            var slot = gearTile(p, _this8.bagAtlas, gear, i, x, y, 152);
            slot.on(Node.EventType.TOUCH_END, function () {
              if (!owned) {
                _this8.info(EQUIPMENT[i], copies ? '该英雄已招募，装备与上阵功能待开放。' : '尚未招募该英雄。');
                return;
              }
              _this8.equipmentInfo(i);
            });
          });
          if (owned) {
            var t = this.heroTextures[this.selected];
            this.sprite(p, t, new Rect(0, 0, t.width, t.height), 0, 245, 495, 495);
          } else {
            var r = tabSources[this.selected];
            var n = this.cut(r[0] + 5, r[1], 108, 110, 0, 245, 285, 290);
            n.getComponent(Sprite).grayscale = !this.model().recruitment.counts[this.selected];
            this.round(n);
            this.text(p, this.model().recruitment.counts[this.selected] ? '已招募 · 培养/上阵待开放' : '未招募', 0, 62, 420, 55, 26);
          }
          this.experienceLabel = this.text(p, owned ? '经验 ' + this.progress().experience[this.selected] + ' / —' : '经验 —', -270, 13, 260, 44, 24);
          this.panel(p, 60, 13, 390, 23, '#C4B8A6', 12);
          this.experienceFill = this.nodeAt(p, 'Experience fill', 60, 13, 380, 16).addComponent(Graphics);
          this.cut(728, 850, 51, 47, 310, 13).on(Node.EventType.TOUCH_END, function () {
            return _this8.info('经验重置', '每位英雄使用独立经验。\n重置后回到1级并返还已投入经验。\n当前版本暂未开放经验重置。');
          });
          this.button(p, '一键换装', -143, -46, 267, 64, function () {
            if (!owned) {
              _this8.info('一键换装', copies ? '该英雄已招募，装备功能待开放。' : '请先招募该英雄。');
              return;
            }
            var before = owned ? _this8.model().loadouts[_this8.selected].slice() : [];
            var error = _this8.mutate(function (b) {
              return b.autoEquip(_this8.selected);
            });
            if (error) {
              _this8.info('一键换装', error);
              return;
            }
            var changes = _this8.model().loadouts[_this8.selected].filter(function (id, i) {
              return id !== before[i];
            }).length;
            _this8.render();
            _this8.info('一键换装', changes ? '已更换' + changes + '件装备，属性已生效并保存。' : '没有更合适的空闲装备。\n不会取走其他英雄正在穿戴的装备。');
          });
          this.upgradeButton = this.button(p, owned ? level >= LEVEL_CAP ? '已满级' : '升级 · ' + upgradeCost(level) + '经验' : copies ? '培养待开放' : '未招募', 145, -46, 267, 64, function () {
            if (!owned) {
              _this8.info('英雄升级', copies ? '该英雄已招募，培养与上阵功能待开放。' : '请先招募该英雄。');
              return;
            }
            var old = _this8.progress().stats[_this8.selected],
              error = _this8.onUpgrade(_this8.selected);
            if (error) {
              _this8.info('英雄升级', error);
              return;
            }
            _this8.render();
            var now = _this8.progress().stats[_this8.selected];
            _this8.info(name + '升级成功', '等级 ' + level + ' → ' + (level + 1) + '\n生命 ' + old.hp + ' → ' + now.hp + '\n攻击 ' + old.attack + ' → ' + now.attack + '\n' + now.skill + '效果 ' + old.power + ' → ' + now.power + '\n已保存，返回冒险立即生效。');
          });
          // One continuous base with two inset rounded panels, matching v6 proportions.
          this.panel(p, 0, -418, 887, 694, '#F8E6CF', 0);
          this.panel(p, 0, -222, 859, 265, '#FFF5E7', 34);
          this.panel(p, 0, -555, 859, 365, '#FFF5E7', 34);
          this.text(p, '技能', -337, -120, 130, 52, 40);
          var skillNames = SKILL_NAMES[this.selected];
          var skillX = [-320, -165, -8, 145];
          skillX.forEach(function (x, i) {
            _this8.panel(p, x, -165, 87, 30, '#F6D6A6', 15);
            _this8.text(p, i % 2 === 0 ? '主动' : '被动', x, -165, 100, 33, 24);
            var open = _this8.model().unlocked(_this8.selected, i);
            var n = open ? _this8.selected === 3 ? _this8.sprite(p, _this8.bagAtlas, new Rect(405, 618, 120, 85), x, -232, 104, 104) : _this8.sprite(p, _this8.battleUI, new Rect([28, 316, 612][_this8.selected], 1413, 120, 120), x, -232, 104, 104) : _this8.cut(535, 1073, 111, 94, x, -232, 112, 100);
            n.on(Node.EventType.TOUCH_END, function () {
              return _this8.skillDialog(i);
            });
            _this8.text(p, skillNames[i], x, -295, 145, 42, 27);
            _this8.text(p, open ? '已解锁' : SKILL_LEVELS[i] + '级解锁', x, -327, 145, 32, 23);
          });
          this.cut(702, 1040, 131, 132, 327, -221, 132, 132).on(Node.EventType.TOUCH_END, function () {
            return _this8.talentDialog();
          });
          this.text(p, '天赋树', 327, -295, 145, 42, 29);
          this.text(p, this.model().talentPoints(this.selected) + '点', 327, -327, 145, 32, 23);
          this.text(p, '英雄属性', -290, -398, 235, 52, 40);
          var names = [['生命', '攻击', '防御', '移速', '暴击率', '暴击伤害', '连击率'], ['破甲率', '冷却缩减', '治疗加成', '护盾加成', '普攻伤害', '技能伤害', '闪避率']];
          var values = [[String((config == null ? void 0 : config.hp) || 0), String((config == null ? void 0 : config.attack) || 0), String(owned ? this.model().stats(this.selected).defense : 0), String((config == null ? void 0 : config.speed) || 0), '0%', '150%', '0%'], ['0%', '0%', '0%', '0%', '0%', '0%', '0%']];
          names.forEach(function (column, c) {
            return column.forEach(function (label, r) {
              var x = c === 0 ? -213 : 207,
                y = -451 - r * 42;
              _this8.panel(p, x, y, 388, 36, '#F8E3C9', 18);
              _this8.cut(c === 0 ? 59 : 481, 1320 + r * 42, 39, 34, x - 157, y, 34, 30);
              var l = _this8.text(p, label, x - 15, y, 185, 36, 26);
              l.horizontalAlign = Label.HorizontalAlign.LEFT;
              var v = _this8.text(p, owned ? values[c][r] : '—', x + 130, y, 115, 36, 26);
              v.horizontalAlign = Label.HorizontalAlign.RIGHT;
              l.node.on(Node.EventType.TOUCH_END, function () {
                return _this8.info(label, label === '移速' ? '移速决定每轮出手顺序。\n不是场景移动速度，也不增加行动次数。' : label === '连击率' ? '普攻触发连击的概率。\n当前战斗样例尚未启用连击。' : label === '破甲率' ? '无视目标防御的比例。\n当前没有破甲装备。防御会减少受到的伤害。' : label === '闪避率' ? '初期仅对普攻生效。\n当前战斗样例尚未启用闪避。' : '生命、攻击、防御包含穿戴装备加成。\n防御直接减少每次敌人攻击伤害，最低1点。\n装备技能效果增加主动技能数值，其余百分比属性暂未启用。');
              });
            });
          });
          drawNavigation(p, this.atlas, this.bagAtlas, 0, function (i) {
            if (i === 1) _this8.onRecruit();else if (i === 2) _this8.onAdventure();else if (i === 3) _this8.onBag();else if (i === 4) _this8.onDungeon();else if (i !== 0) _this8.info(['英雄', '招募', '冒险', '背包', '副本'][i], '此功能尚未开放。');
          });
          this.refreshIncome();
        };
        return HeroPage;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalSave.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "04816UDbIZM5YQEZGHAiYnl", "LocalSave", undefined);
      var SAVE_KEY = exports('SAVE_KEY', 's6game.progress.v1');
      var BACKUP_KEY = exports('BACKUP_KEY', SAVE_KEY + '.backup');
      // The caller validates the complete game schema before accepting a slot.
      var LocalSave = exports('LocalSave', /*#__PURE__*/function () {
        function LocalSave(storage, decode) {
          this.lastGood = null;
          this.error = '';
          this.blocked = false;
          this.storage = void 0;
          this.decode = void 0;
          this.storage = storage;
          this.decode = decode;
        }
        var _proto = LocalSave.prototype;
        _proto.load = function load() {
          var damaged = false;
          for (var _i = 0, _arr = [SAVE_KEY, BACKUP_KEY]; _i < _arr.length; _i++) {
            var _key = _arr[_i];
            try {
              var _raw = this.storage.getItem(_key);
              if (_raw === null) continue;
              var _value = this.decode(JSON.parse(_raw));
              if (_value) {
                this.lastGood = _raw;
                this.error = damaged ? '主存档异常，已恢复备份' : '';
                return _value;
              }
              damaged = true;
            } catch (_unused) {
              damaged = true;
            }
          }
          this.blocked = damaged;
          this.error = damaged ? '存档异常，已保留原文件并停止自动保存' : '';
          return null;
        };
        _proto.save = function save(value) {
          if (this.blocked) return false;
          try {
            if (!this.decode(value)) throw new Error('Invalid snapshot');
            var _raw2 = JSON.stringify(value);
            if (this.lastGood) this.storage.setItem(BACKUP_KEY, this.lastGood);
            this.storage.setItem(SAVE_KEY, _raw2);
            this.lastGood = _raw2;
            this.error = '';
            return true;
          } catch (_unused2) {
            this.error = '本地存档失败，请检查浏览器存储空间或权限';
            return false;
          }
        };
        return LocalSave;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Adventure.ts', './BagPage.ts', './BattleFeedback.ts', './BattleModel.ts', './BattleTiming.ts', './BattleView.ts', './DungeonPage.ts', './EquipmentModal.ts', './FormationModal.ts', './GearView.ts', './HeroPage.ts', './LocalSave.ts', './ModalView.ts', './RecruitPage.ts', './ScreenLayout.ts', './SecondEditionStyles.ts', './SecondEditionUI.ts', './SquadBattleModel.ts', './V2Progress.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/ModalView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _construct, cclegacy, Node, Layers, UITransform, Graphics, Color, Label, SpriteFrame, Sprite, Rect, BlockInputEvents;
  return {
    setters: [function (module) {
      _construct = module.construct;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Graphics = module.Graphics;
      Color = module.Color;
      Label = module.Label;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Rect = module.Rect;
      BlockInputEvents = module.BlockInputEvents;
    }],
    execute: function () {
      exports({
        inModal: inModal,
        modalButton: modalButton,
        modalIcon: modalIcon,
        modalImage: modalImage,
        modalNode: modalNode,
        modalPanel: modalPanel,
        modalRow: modalRow,
        modalSection: modalSection,
        modalSelect: modalSelect,
        modalText: modalText,
        setModalSkin: setModalSkin
      });
      cclegacy._RF.push({}, "f91d5EnPPZP15BGJyg6+2/T", "ModalView", undefined);
      var MODAL_INK = exports('MODAL_INK', '#704124');
      var skin = null;
      var controls = null;
      var CONTROL_RECTS = [[48, 156, 348, 142], [452, 156, 349, 142], [856, 156, 350, 142], [84, 496, 262, 267], [491, 495, 263, 269], [910, 494, 236, 262], [103, 883, 236, 276], [495, 904, 259, 252], [896, 899, 263, 269]];
      var cards = new WeakSet();
      var regions = new WeakMap();
      function setModalSkin(texture, atlas) {
        skin = texture;
        controls = atlas;
      }
      function modalIcon(parent, index, x, y, size) {
        if (size === void 0) {
          size = 54;
        }
        if (!controls) return modalText(parent, ['', '', '', '×', 'i', '▣', '♧', '★', '◷'][index], x, y, size, size, size * .7).node;
        var r = CONTROL_RECTS[index];
        return modalImage(parent, controls, _construct(Rect, r), x, y, size * r[2] / Math.max(r[2], r[3]), size * r[3] / Math.max(r[2], r[3]));
      }
      function modalNode(parent, name, x, y, w, h) {
        var _regions$get;
        parent = ((_regions$get = regions.get(parent)) == null ? void 0 : _regions$get.content) || parent;
        var n = new Node(name);
        n.parent = parent;
        n.layer = Layers.Enum.UI_2D;
        n.setPosition(x, y);
        n.addComponent(UITransform).setContentSize(w, h);
        return n;
      }
      function modalPanel(parent, x, y, w, h, color, radius) {
        if (color === void 0) {
          color = '#FBE3C6';
        }
        if (radius === void 0) {
          radius = 20;
        }
        var n = modalNode(parent, 'Modal panel', x, y, w, h),
          g = n.addComponent(Graphics);
        g.fillColor = new Color().fromHEX(color);
        g.roundRect(-w / 2, -h / 2, w, h, Math.min(radius, w / 2, h / 2));
        g.fill();
        return n;
      }
      function modalText(parent, text, x, y, w, h, size, color) {
        if (size === void 0) {
          size = 28;
        }
        if (color === void 0) {
          color = MODAL_INK;
        }
        var n = modalNode(parent, text, x, y, w, h),
          l = n.addComponent(Label);
        l.string = text;
        l.fontFamily = 'Microsoft YaHei';
        l.isBold = true;
        l.fontSize = size;
        l.lineHeight = size * 1.4;
        l.color = new Color().fromHEX(color);
        l.horizontalAlign = Label.HorizontalAlign.CENTER;
        l.verticalAlign = Label.VerticalAlign.CENTER;
        l.overflow = Label.Overflow.SHRINK;
        return l;
      }
      function modalImage(parent, texture, rect, x, y, w, h) {
        var n = modalNode(parent, 'Modal artwork', x, y, w, h),
          f = new SpriteFrame();
        f.texture = texture;
        f.rect = rect;
        var s = n.addComponent(Sprite);
        s.sizeMode = Sprite.SizeMode.CUSTOM;
        s.spriteFrame = f;
        return n;
      }
      function inModal(parent) {
        for (var n = parent; n; n = n.parent) if (cards.has(n)) return true;
        return false;
      }
      function modalButton(parent, text, x, y, w, h, run, tone) {
        if (tone === void 0) {
          tone = 'gold';
        }
        var region = regions.get(parent);
        if (region) parent = y < region.actionTop ? region.actions : region.content;
        var n = modalNode(parent, 'Action ' + text, x, y, w, h);
        n.name = 'Action ' + text;
        n.setPosition(x, y);
        var colors = tone === 'gold' ? ['#FFBE32', '#FFD34D', '#FFE576'] : tone === 'peach' ? ['#F29B6E', '#FFB98D', '#FFD1A9'] : ['#DECFB7', '#E9DCC8', '#F2E6D4'];
        if (controls) {
          var r = CONTROL_RECTS[tone === 'gold' ? 0 : tone === 'peach' ? 1 : 2],
            k = h / r[3],
            art = modalNode(n, 'Nine-sliced button', 0, 0, w / k, r[3]);
          art.setScale(k, k, 1);
          var f = new SpriteFrame();
          f.texture = controls;
          f.rect = _construct(Rect, r);
          f.insetLeft = 74;
          f.insetRight = 74;
          f.insetTop = 60;
          f.insetBottom = 60;
          var s = art.addComponent(Sprite);
          s.type = Sprite.Type.SLICED;
          s.sizeMode = Sprite.SizeMode.CUSTOM;
          s.spriteFrame = f;
        } else {
          modalPanel(n, 0, 4, w, h - 4, colors[0], h / 2);
          modalPanel(n, 0, 8, w - 6, h - 12, colors[1], h / 2);
          modalPanel(n, 0, h * .23, w - 25, h * .26, colors[2], h / 4);
        }
        modalText(n, text, 0, 5, w - 24, h - 6, 29);
        n.on(Node.EventType.TOUCH_END, function (event) {
          event.propagationStopped = true;
          run();
        });
        return n;
      }
      function modalSection(parent, title, y, width) {
        if (width === void 0) {
          width = 690;
        }
        var n = modalPanel(parent, -width / 2 + 130, y, 260, 48, '#FBD8A5', 24);
        modalText(n, '❧ ' + title, 0, 0, 245, 44, 28);
        return n;
      }
      function modalRow(parent, icon, name, value, y, width) {
        if (width === void 0) {
          width = 690;
        }
        var n = modalPanel(parent, 0, y, width, 51, '#FBE1C2', 25);
        if (icon === '◷' || icon === '★') modalIcon(n, icon === '◷' ? 8 : 7, -width / 2 + 39, 0, 35);else modalText(n, icon, -width / 2 + 39, 0, 54, 46, 31, '#AA713F');
        var label = modalText(n, name, -width / 2 + 210, 0, 270, 46, 28);
        label.horizontalAlign = Label.HorizontalAlign.LEFT;
        var v = modalText(n, value, width / 2 - 133, 0, 235, 46, 29);
        v.horizontalAlign = Label.HorizontalAlign.RIGHT;
        return n;
      }
      function modalSelect(parent, label, x, y, width, options, selected, onSelect) {
        return modalButton(parent, label + ' ▾', x, y, width, 60, function () {
          var overlay = modalNode(parent, 'Anchored dropdown', 0, 0, 887, 1774);
          overlay.parent = parent;
          overlay.setSiblingIndex(parent.children.length - 1);
          overlay.addComponent(BlockInputEvents);
          overlay.on(Node.EventType.TOUCH_END, function (e) {
            e.propagationStopped = true;
            overlay.destroy();
          });
          var height = options.length * 58 + 12,
            centerY = y > 0 ? y - 36 - height / 2 : y + 36 + height / 2;
          var menu = modalPanel(overlay, x, centerY, width, height, '#EED3AC', 18);
          menu.addComponent(BlockInputEvents);
          menu.on(Node.EventType.TOUCH_END, function (e) {
            return e.propagationStopped = true;
          });
          options.forEach(function (option, i) {
            return modalButton(menu, option, 0, height / 2 - 35 - i * 58, width - 12, 54, function () {
              overlay.destroy();
              onSelect(i);
            }, i === selected ? 'gold' : 'muted');
          });
        }, 'peach');
      }

      /** All dialogs share the same scalable skin, regions and input boundary.
       * Content/actions use card-local coordinates so feature code owns only its data and handlers.
       * Nested dialogs consume input independently; dismissing them never dismisses their parent.
       */
      var ModalView = exports('ModalView', function ModalView(parent, title, height, onClose, width) {
        if (width === void 0) {
          width = 820;
        }
        this.layer = void 0;
        this.card = void 0;
        this.content = void 0;
        this.actions = void 0;
        this.height = height;
        this.width = width;
        var layer = this.layer = modalNode(parent, 'Modal ' + title, 0, 0, 887, 1774);
        layer.addComponent(BlockInputEvents);
        var shade = layer.addComponent(Graphics);
        shade.fillColor = new Color(31, 23, 13, 175);
        shade.rect(-443.5, -887, 887, 1774);
        shade.fill();
        layer.on(Node.EventType.TOUCH_END, function (e) {
          e.propagationStopped = true;
          onClose();
        });
        var card = this.card = modalNode(layer, 'Modal card', 0, 0, width, height);
        cards.add(card);
        card.addComponent(BlockInputEvents);
        card.on(Node.EventType.TOUCH_END, function (e) {
          return e.propagationStopped = true;
        });
        if (skin) {
          var f = new SpriteFrame();
          f.texture = skin;
          f.rect = new Rect(16, 80, skin.width - 32, skin.height - 128);
          // Fixed decorative caps, stretch only the blank center and straight edges.
          f.insetLeft = 110;
          f.insetRight = 110;
          f.insetTop = 245;
          f.insetBottom = 300;
          var s = card.addComponent(Sprite);
          s.type = Sprite.Type.SLICED;
          s.sizeMode = Sprite.SizeMode.CUSTOM;
          s.spriteFrame = f;
        } else modalPanel(card, 0, 0, width, height, '#FFF2DB', 40);
        this.content = modalNode(card, 'Modal content region', 0, 0, width - 100, height - 400);
        this.actions = modalNode(card, 'Modal button region', 0, 0, width - 100, height);
        modalText(card, title, -8, height / 2 - 120, width - 300, 72, 40);
        var close = modalNode(card, 'Close modal', width / 2 - 78, height / 2 - 158, 96, 96);
        close.on(Node.EventType.TOUCH_END, function (e) {
          e.propagationStopped = true;
          onClose();
        });
        // Atlas artwork overlays the skin close mark; all dialogs use one large hit target.
        if (controls) modalIcon(close, 3, 0, 0, 91);else if (!skin) {
          modalPanel(close, 0, 0, 78, 78, '#F5A343', 39);
          modalText(close, '×', 0, 0, 70, 70, 46, '#FFFFFF');
        }
        modalText(layer, '❧  点击空白处关闭  ❧', 0, -height / 2 - 48, 740, 45, 25, '#FFF0D5');
        regions.set(card, {
          content: this.content,
          actions: this.actions,
          actionTop: -height / 2 + 220
        });
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RecruitPage.ts", ['cc', './ModalView.ts', './SquadBattleModel.ts', './GearView.ts'], function (exports) {
  var cclegacy, Node, Layers, UITransform, Graphics, Color, Label, SpriteFrame, Sprite, Rect, ModalView, modalIcon, modalPanel, modalImage, modalButton, modalSection, modalRow, RECRUIT_HEROES, recruit, RECRUIT_CONFIG, drawNavigation;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Graphics = module.Graphics;
      Color = module.Color;
      Label = module.Label;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Rect = module.Rect;
    }, function (module) {
      ModalView = module.ModalView;
      modalIcon = module.modalIcon;
      modalPanel = module.modalPanel;
      modalImage = module.modalImage;
      modalButton = module.modalButton;
      modalSection = module.modalSection;
      modalRow = module.modalRow;
    }, function (module) {
      RECRUIT_HEROES = module.RECRUIT_HEROES;
      recruit = module.recruit;
      RECRUIT_CONFIG = module.RECRUIT_CONFIG;
    }, function (module) {
      drawNavigation = module.drawNavigation;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7c30dUBUtZHzLfNm0Lnepcz", "RecruitPage", undefined);
      var RecruitPage = exports('RecruitPage', /*#__PURE__*/function () {
        function RecruitPage(parent, art, heroAtlas, bagAtlas, navigate, model, mutate, heroTextures) {
          this.node = void 0;
          this.content = void 0;
          this.modal = null;
          this.pool = 0;
          this.art = art;
          this.heroAtlas = heroAtlas;
          this.bagAtlas = bagAtlas;
          this.navigate = navigate;
          this.model = model;
          this.mutate = mutate;
          this.heroTextures = heroTextures;
          this.node = this.base(parent, 'Recruit page', 0, 0, 887, 1774);
          this.render();
          this.node.active = false;
        }
        var _proto = RecruitPage.prototype;
        _proto.base = function base(p, name, x, y, w, h) {
          var n = new Node(name);
          n.parent = p;
          n.layer = Layers.Enum.UI_2D;
          n.setPosition(x, y);
          n.addComponent(UITransform).setContentSize(w, h);
          return n;
        };
        _proto.panel = function panel(p, x, y, w, h, color, r) {
          if (color === void 0) {
            color = '#FFF4E3';
          }
          if (r === void 0) {
            r = 28;
          }
          var n = this.base(p, 'Panel', x, y, w, h),
            g = n.addComponent(Graphics);
          g.fillColor = new Color().fromHEX(color);
          g.roundRect(-w / 2, -h / 2, w, h, r);
          g.fill();
          return n;
        };
        _proto.text = function text(p, t, x, y, w, h, size, color) {
          if (size === void 0) {
            size = 30;
          }
          if (color === void 0) {
            color = '#704124';
          }
          var l = this.base(p, t, x, y, w, h).addComponent(Label);
          l.string = t;
          l.fontFamily = 'Microsoft YaHei';
          l.fontSize = size;
          l.lineHeight = size * 1.4;
          l.isBold = true;
          l.color = new Color().fromHEX(color);
          l.horizontalAlign = Label.HorizontalAlign.CENTER;
          l.verticalAlign = Label.VerticalAlign.CENTER;
          l.overflow = Label.Overflow.SHRINK;
          return l;
        };
        _proto.button = function button(p, t, x, y, w, h, fn, active) {
          if (active === void 0) {
            active = false;
          }
          var n = this.panel(p, x, y, w, h, active ? '#FFCE52' : '#FFF4E3');
          this.text(n, t, 0, 0, w - 20, h - 10, 31);
          n.on(Node.EventType.TOUCH_END, fn);
          return n;
        };
        _proto.image = function image(p, r, x, y, w, h) {
          var n = this.base(p, 'Recruit illustration', x, y, w, h),
            f = new SpriteFrame();
          f.texture = this.art;
          f.rect = r;
          var s = n.addComponent(Sprite);
          s.sizeMode = Sprite.SizeMode.CUSTOM;
          s.spriteFrame = f;
          return n;
        };
        _proto.close = function close() {
          var _this$modal;
          (_this$modal = this.modal) == null || _this$modal.destroy();
          this.modal = null;
        };
        _proto.card = function card(title, height) {
          var _this = this;
          if (height === void 0) {
            height = 1100;
          }
          this.close();
          var view = new ModalView(this.node, title, height, function () {
            return _this.close();
          });
          this.modal = view.layer;
          return view.card;
        };
        _proto.info = function info(title, body) {
          var p = this.card(title, 860);
          modalIcon(p, 4, 0, 140, 90);
          this.text(p, body, 0, -80, 680, 320, 28);
        };
        _proto.results = function results(rows, history) {
          var _this2 = this;
          if (history === void 0) {
            history = false;
          }
          if (!rows.length) {
            this.info('招募结果', '暂无招募记录');
            return;
          }
          var p = this.card(history ? '招募记录' : '招募结果', 1160);
          this.text(p, (history ? '最近' : '本次获得 ') + rows.length + ' 名英雄', 0, 355, 680, 50, 30);
          rows.slice(-10).forEach(function (r, i) {
            var x = -280 + i % 5 * 140,
              y = 205 - Math.floor(i / 5) * 250,
              n = modalPanel(p, x, y, 126, 160, ['#6DBCE7', '#C18BE1', '#FFDA68'][r.rarity], 18),
              t = _this2.heroTextures[r.hero];
            modalImage(n, t, new Rect(0, 0, t.width, t.height), 0, 20, 115, 115);
            _this2.text(n, RECRUIT_HEROES[r.hero], 0, -48, 122, 38, 23);
            _this2.text(p, ['稀有', '史诗', '传说'][r.rarity], x, y - 106, 130, 35, 22);
            _this2.text(p, r.fresh ? '新获得' : '重复 +1', x, y - 145, 134, 35, 22, r.fresh ? '#BB662D' : '#906C49');
          });
          this.text(p, '招募券剩余 ' + this.model().recruitment.tickets, 0, -285, 680, 45, 28);
          if (!history) modalButton(p, '再招募十次 · 10券', 0, -450, 420, 80, function () {
            return _this2.draw(10);
          });
        };
        _proto.poolDetails = function poolDetails() {
          var _this3 = this;
          var p = this.card('卡池详情', 1210),
            r = this.model().recruitment,
            progress = r.pity[this.pool];
          ['常驻池', 'UP池'].forEach(function (t, i) {
            return modalButton(p, t, -170 + i * 340, 350, 300, 60, function () {
              _this3.pool = i;
              _this3.render();
              _this3.poolDetails();
            }, i === _this3.pool ? 'gold' : 'peach');
          });
          this.text(p, this.pool ? '本期UP：法师' : '常驻池 · 四职业等概率', 0, 260, 680, 60, 32);
          modalSection(p, '抽取概率', 175);
          ['稀有', '史诗', '传说'].forEach(function (t, i) {
            return modalRow(p, '✦', t, ['75%', '20%', '5%'][i], 105 - i * 60);
          });
          modalSection(p, '保底进度', -100);
          modalRow(p, '✦', '史诗保底', progress.epic + ' / 10', -167);
          modalRow(p, '★', '传说保底', progress.legend + ' / 30', -227);
          this.text(p, (this.pool ? 'UP池传说必得法师，其他品质法师62.5%。' : '常驻四职业等概率。') + '\n两池保底独立，单抽与十连累计本池进度。\n10抽至少史诗，30抽必出传说；出货重置。', 0, -365, 680, 140, 24);
        };
        _proto.draw = function draw(n) {
          var _this4 = this;
          var error = this.mutate(function (b) {
            return recruit(b.recruitment, _this4.pool, n);
          });
          if (error) {
            this.info('招募未完成', error);
            return;
          }
          this.render();
          this.results(this.model().recruitment.last);
        };
        _proto.hit = function hit(p, name, x, y, w, h, fn) {
          var n = this.base(p, name, x, y, w, h);
          n.on(Node.EventType.TOUCH_END, fn);
          return n;
        };
        _proto.render = function render() {
          var _this$content,
            _this5 = this;
          (_this$content = this.content) == null || _this$content.destroy();
          var p = this.content = this.base(this.node, 'Recruit content', 0, 0, 887, 1774),
            r = this.model().recruitment,
            progress = r.pity[this.pool];
          // Full reference composition; replace example counters with live UI and use explicit touch targets.
          this.image(p, new Rect(this.pool ? 901 : 330, 4, 544, 880), 0, 0, 887, 1774);
          this.panel(p, -130, 810, 240, 80);
          this.text(p, '券 ' + r.tickets, -130, 810, 200, 55, 30);
          ['常驻招募', '限时UP'].forEach(function (t, i) {
            return _this5.hit(p, t, -165 + i * 360, 664, 350, 100, function () {
              if (_this5.pool !== i) {
                _this5.pool = i;
                _this5.render();
              }
            });
          });
          if (this.pool) {
            this.panel(p, 331, 465, 192, 55);
            this.text(p, '测试UP池', 331, 465, 185, 48, 24);
          }
          this.panel(p, 28, -225, 450, 38, '#C3B4A4', 18);
          if (progress.legend) {
            var w = 450 * progress.legend / RECRUIT_CONFIG.legendPity;
            this.panel(p, 28 - 225 + w / 2, -225, w, 38, '#FFC84A', Math.min(18, w / 2));
          }
          this.text(p, progress.legend + ' / ' + RECRUIT_CONFIG.legendPity + ' · 传说保底', 28, -225, 450, 48, 25);
          this.text(p, '累计 ' + progress.total + ' 次 · 再' + (10 - progress.epic) + '次至少史诗', 0, -280, 800, 42, 24);
          this.hit(p, '心愿英雄', -240, -334, 330, 100, function () {
            return _this5.info('心愿英雄', '本轮未启用心愿加成。\nUP池主题英雄：法师。\n可在卡池详情查看测试概率。');
          });
          this.hit(p, '卡池详情', 84, -334, 230, 100, function () {
            return _this5.poolDetails();
          });
          this.hit(p, '招募记录', 306, -334, 210, 100, function () {
            var rows = r.history.filter(function (x) {
              return x.pool === _this5.pool;
            }).slice(-10);
            _this5.results(rows, true);
          });
          this.hit(p, '上次结果', 337, -224, 115, 95, function () {
            return _this5.results(r.last);
          });
          [1, 10].forEach(function (n, i) {
            return _this5.hit(p, '招募' + n + '次', -210 + i * 420, -620, 395, 130, function () {
              return _this5.draw(n);
            });
          });
          this.text(p, '测试配置 · 10抽至少史诗 / 30抽传说', 0, -705, 810, 36, 22);
          this.panel(p, 0, -800, 887, 174, '#F8E6CF', 0);
          drawNavigation(p, this.heroAtlas, this.bagAtlas, 1, function (i) {
            if (i === 0) _this5.navigate('hero');else if (i === 2) _this5.navigate('adventure');else if (i === 3) _this5.navigate('bag');else if (i === 4) _this5.navigate('dungeon');
          });
        };
        return RecruitPage;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenLayout.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, view, UITransform, Sprite, Graphics, Node, Color;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      view = module.view;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Graphics = module.Graphics;
      Node = module.Node;
      Color = module.Color;
    }],
    execute: function () {
      exports('fitScreen', fitScreen);
      cclegacy._RF.push({}, "0580a7dB/tBRZOAwHccCIwc", "ScreenLayout", undefined);
      var original = new WeakMap();
      // Preserve icon/label geometry; distribute their anchors over the real visible height.
      function fitScreen(canvas, camera) {
        var height = view.getVisibleSize().height;
        canvas.setPosition(443.5, height / 2, 0);
        canvas.getComponent(UITransform).setContentSize(887, height);
        camera.node.setPosition(443.5, height / 2, 1000);
        camera.orthoHeight = height / 2;
        var containers = [];
        for (var _iterator = _createForOfIteratorHelperLoose(canvas.children), _step; !(_step = _iterator()).done;) {
          var page = _step.value;
          if (page.getChildByName('Modal card')) {
            fitModal(page, height);
            continue;
          }
          if (page.name === 'Adventure page') containers.push(page);else {
            for (var _iterator3 = _createForOfIteratorHelperLoose(page.children), _step3; !(_step3 = _iterator3()).done;) {
              var _content = _step3.value;
              if (_content.getChildByName('Modal card')) fitModal(_content, height);else if (/content|Dungeon battle/i.test(_content.name)) containers.push(_content);
            }
          }
        }
        for (var _i = 0, _containers = containers; _i < _containers.length; _i++) {
          var p = _containers[_i];
          for (var _iterator2 = _createForOfIteratorHelperLoose(p.children), _step2; !(_step2 = _iterator2()).done;) {
            var n = _step2.value;
            if (n.getChildByName('Modal card')) {
              fitModal(n, height);
              continue;
            }
            var u = n.getComponent(UITransform);
            if (!u) continue;
            if (n.name === 'Battle actors') {
              var shrink = Math.min(1, Math.max(.65, 1 + (height - 1774) / 1100));
              n.setScale(shrink, shrink, 1);
              n.setPosition(0, Math.max(0, (1774 - height) * .6), 0);
              continue;
            }
            if (!original.has(n)) original.set(n, {
              x: n.position.x,
              y: n.position.y,
              height: u.height,
              width: u.width,
              scaleX: n.scale.x,
              scaleY: n.scale.y
            });
            var o = original.get(n);
            if (o.applied === height) continue;
            o.applied = height;
            // Combat feedback owns its moving sprites and must not be repositioned by layout.
            if ((p.name === 'Adventure page' || p.name === 'Dungeon battle') && (n.name === 'Combat effects' || n.getComponent(Sprite) && /^(骑士|法师|牧师|弓箭手|Monster |Empty slot)/.test(n.name) || (n.name === 'Health' || /^(heart|shield)$/.test(n.name)) && o.y > -333)) continue;
            n.setScale(o.scaleX, o.scaleY, n.scale.z);
            var delta = (height - 1774) / 2;
            var compact = p.name !== 'Adventure page' && p.name !== 'Dungeon content' && p.name !== 'Dungeon battle';
            if (compact && height < 1774 && n.name !== 'Navigation' && o.width < 880) {
              var scale = height / 1774;
              n.setPosition(o.x * scale, o.y * scale, n.position.z);
              n.setScale(o.scaleX * scale, o.scaleY * scale, 1);
              continue;
            }
            var battle = p.name === 'Adventure page' || p.name === 'Dungeon battle';
            var bottom = n.name === 'Navigation' || battle && (o.y < -333 || ['Formation', '离开', 'Battle notice', '查看结算'].indexOf(n.name) >= 0) || p.name === 'Dungeon content' && o.y <= -680;
            var top = p.name === 'Adventure page' || p.name === 'Dungeon battle' ? 300 : 580;
            var y = o.y >= top ? o.y + delta : bottom ? o.y - delta : o.y;
            n.setPosition(o.x, y, n.position.z);
            if (n.name === 'Forest') {
              var extension = typeof document !== 'undefined' && document.getElementById('s6-v2') ? 100 : 0;
              var forestHeight = height / 2 + 333 + delta + extension;
              n.setScale(1, forestHeight / o.height, 1);
              n.setPosition(0, (height / 2 - 333 - delta - extension) / 2, 0);
            } else if (o.width >= 880 && o.height >= 1770) {
              n.setScale(n.scale.x, o.scaleY * height / 1774, n.scale.z);
            } else if (n.getComponent(Sprite) && o.width >= 880) {
              n.setScale(n.scale.x, o.scaleY * height / 1774, n.scale.z);
            } else if (n.name === 'Dungeon vertical scroll') {
              u.setContentSize(o.width, o.height + height - 1774);
              var content = n.children[0];
              if (content) {
                var scrollHeight = u.height;
                var contentHeight = content.getComponent(UITransform).height;
                content.setPosition(content.position.x, scrollHeight / 2 - contentHeight / 2, 0);
              }
            }
          }
        }
      }
      var modalHeights = new WeakMap();
      function fitModal(layer, height) {
        var _layer$getComponent;
        if (modalHeights.get(layer) === height) return;
        modalHeights.set(layer, height);
        (_layer$getComponent = layer.getComponent(UITransform)) == null || _layer$getComponent.setContentSize(887, height);
        var g = layer.getComponent(Graphics);
        if (g) {
          // Keep generated geometry intact; put a separate full-height shade behind the card.
          var shade = layer.getChildByName('Responsive shade');
          if (!shade) {
            shade = new Node('Responsive shade');
            shade.parent = layer;
            shade.layer = layer.layer;
            shade.setSiblingIndex(0);
            var graphics = shade.addComponent(Graphics);
            graphics.fillColor = new Color(31, 23, 13, 175);
            graphics.rect(-443.5, -887, 887, 1774);
            graphics.fill();
            g.enabled = false;
          }
          shade.setScale(1, height / 1774, 1);
        }
        var card = layer.children.find(function (n) {
          return n.name === 'Modal card';
        });
        if (card) {
          var h = card.getComponent(UITransform).height;
          var scale = Math.min(1, (height - 110) / h);
          card.setScale(scale, scale, 1);
          var hint = layer.children.find(function (n) {
            return n.name.indexOf('点击空白处关闭') >= 0;
          });
          if (hint) hint.setPosition(0, -h * scale / 2 - 42);
        }
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SecondEditionStyles.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "78953leEdlNeJKBqhrj48AG", "SecondEditionStyles", undefined);
      /** Shared responsive skin, nine-slice controls and square item grids. */
      var SECOND_EDITION_STYLES = exports('SECOND_EDITION_STYLES', "\nhtml,body{background:#263b2c!important}\n#s6-v2,#s6-v2 *{box-sizing:border-box}\n#s6-v2{--ink:#623719;--cream:#fff2df;--gold:#ffcc27;--scene:none;position:fixed;inset:0;margin:auto;width:min(100vw,56.25dvh,600px);max-width:600px;height:100dvh;color:var(--ink);font-family:'Microsoft YaHei','PingFang SC',sans-serif;font-size:clamp(12px,2.7vw,17px);font-weight:700;z-index:20;pointer-events:none;container-type:inline-size;isolation:isolate}\n#s6-v2 button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}\n#s6-v2 img{object-fit:contain;max-width:100%;user-select:none}\n#s6-v2 h1,#s6-v2 h2,#s6-v2 h3,#s6-v2 p{margin:0}\n#s6-v2 h1{font-size:5.2cqw}\n#s6-v2 h2{font-size:4cqw}\n#s6-v2 h3{font-size:3.7cqw}\n#s6-v2 small{font-size:2.7cqw}\n#s6-v2 em{font-style:normal;color:#348c13}\n#s6-backdrop{position:fixed;inset:0;background-position:center;background-size:cover;z-index:0;pointer-events:none}\n#GameDiv,#Cocos3dGameContainer{background:transparent!important}\n#GameDiv{position:relative!important;z-index:1!important;width:min(100vw,56.25dvh,600px)!important;max-width:600px;margin:auto!important}\n#s6-v2 .v2-content{height:100%;position:relative}\n#s6-v2 .page,#s6-v2 .secondary{height:100%;pointer-events:auto;background:#fce7ce;overflow:hidden;display:flex;flex-direction:column;padding:2cqw 2cqw 0;gap:1.5cqw;background-image:var(--scene);background-size:100% auto;background-repeat:no-repeat}\n#s6-v2 .v2-button{border:1px solid #eda516;border-radius:2.8cqw;background:linear-gradient(#ffe45d 0%,#ffcc20 65%,#ffbc10);box-shadow:inset 0 1px 1px #fffbd1,0 2px 2px #be813040;min-height:7cqw;padding:1cqw 3cqw;display:inline-flex;align-items:center;justify-content:center;gap:.7cqw;position:relative;flex-shrink:0;pointer-events:auto;text-shadow:0 1px #ffffff50}\n#s6-v2 .v2-button:hover{filter:brightness(1.035)}\n#s6-v2 .v2-button:active{transform:translateY(1px)}\n#s6-v2 .v2-button:focus-visible{outline:3px solid #2a83ce;outline-offset:2px}\n#s6-v2 .quiet{background:linear-gradient(#fff6e8,#ffe4c1);border-color:#ecd1ae}\n#s6-v2 .selected{background:linear-gradient(#ffe969,#ffc213);border-color:#eaaa22;box-shadow:inset 0 0 0 1px #fff6bf,0 2px 3px #a96b3140}\n#s6-v2 .v2-button:disabled{filter:grayscale(.7);opacity:.62;cursor:default}\n#s6-v2 .flat,#s6-v2 .equipment-slot{border:0;background:none;box-shadow:none;padding:0;min-height:0}\n#s6-v2 .wallet{display:flex;gap:2cqw;min-height:8.5cqw;align-items:center;padding:0 1cqw}\n#s6-v2 .resource{display:inline-flex;align-items:center;background:#fff0d9;border:1px solid #9e662e;border-radius:8cqw;height:6.5cqw;padding:0 2cqw 0 .3cqw;gap:1cqw;font-size:3.4cqw;box-shadow:0 2px 1px #7d4a3b22}\n#s6-v2 .resource img{height:7cqw;width:7cqw;margin-top:-.2cqw}\n#s6-v2 .v2-nav{display:grid;grid-template-columns:repeat(5,1fr);gap:1cqw;margin-top:auto;padding:1cqw 0 max(1cqw,env(safe-area-inset-bottom));min-height:14cqw;pointer-events:auto}\n#s6-v2 .v2-nav button{padding:1cqw .5cqw;flex-direction:column;gap:0;border-radius:4cqw;font-size:3.5cqw;min-width:0}\n#s6-v2 .v2-nav img{height:7cqw;width:11cqw}\n#s6-v2 .main-tabs{display:flex;gap:1cqw}\n#s6-v2 .main-tabs button{flex:1;min-width:0;border-radius:8cqw;font-size:3.8cqw;padding:1.5cqw .5cqw}\n#s6-v2 .page-actions{display:flex;gap:3cqw;justify-content:center}\n#s6-v2 .page-actions button{min-width:32%;font-size:3.8cqw}\n#s6-v2 .cream-card{background:#fff6e5bd;border:1px solid #fff5df;border-radius:3cqw;padding:2cqw;box-shadow:0 1px 2px #ab6e2b16}\n#s6-v2 .section-title{align-self:flex-start;font-size:3.5cqw!important;padding:.8cqw 2cqw;margin-bottom:1cqw!important;background:linear-gradient(90deg,#ffdc9f,#ffdc9f80);border-radius:9cqw;display:table}\n#s6-v2 .stat-row{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(90deg,#fbe1be,#fce5c9);border-radius:5cqw;padding:.7cqw 2.5cqw;margin:1cqw 0;font-size:3.2cqw;min-height:4.5cqw;gap:1cqw}\n#s6-v2 .two-grid{display:grid;grid-template-columns:1fr 1fr;gap:1cqw 2cqw}\n#s6-v2 .face{aspect-ratio:1;object-fit:contain}\n#s6-v2 .hero-tabs{display:flex;gap:1cqw}\n#s6-v2 .hero-tabs button{flex:1;padding:0;font-size:3.3cqw;border-radius:3cqw;min-width:0;height:9cqw}\n#s6-v2 .hero-tabs img{width:10cqw;margin-left:-1cqw}\n#s6-v2 .hero-stage{position:relative;flex:1;min-height:44cqw;max-height:65cqw;text-align:center;padding-top:.7cqw}\n#s6-v2 .hero-stage h1{font-size:5cqw}\n#s6-v2 .stars{color:#f9b800;text-shadow:0 1px #9f540f;font-size:5cqw;display:flex;align-items:center;justify-content:center;gap:.7cqw}\n#s6-v2 .stars>span{color:#aaa89b}\n#s6-v2 .star-button{border-radius:50%;padding:0;width:6cqw;min-height:6cqw;font-size:5cqw;margin-left:2cqw}\n#s6-v2 .roles{font-size:3cqw}\n#s6-v2 .hero-figure{position:absolute;width:54%;height:78%;bottom:0;left:23%;pointer-events:none}\n#s6-v2 .equipment-left,#s6-v2 .equipment-right{position:absolute;top:11cqw;bottom:0;display:flex;flex-direction:column;justify-content:space-around;width:18cqw;z-index:1}\n#s6-v2 .equipment-left{left:3cqw}\n#s6-v2 .equipment-right{right:3cqw}\n#s6-v2 .equipment-slot{display:flex;flex-direction:column;width:100%;gap:.3cqw}\n#s6-v2 .gear-tile{position:relative;aspect-ratio:1;background:linear-gradient(130deg,#ffffff25,transparent),var(--quality,#c4b6a6);border-radius:2cqw;overflow:hidden;width:100%}\n#s6-v2 .gear-tile>img{width:98%;height:98%;padding:2%;object-fit:contain}\n#s6-v2 .gear-tile.empty{background:#c5b8a7}\n#s6-v2 .gear-level{position:absolute;right:4%;bottom:1%;font-size:3.2cqw;color:white;text-shadow:1px 1px #5f3b21,-1px -1px #5f3b21,1px -1px #5f3b21,-1px 1px #5f3b21}\n#s6-v2 .gear-lock{position:absolute;right:4%;top:1%;color:#fff4c0;font-size:3.5cqw;text-shadow:1px 1px #4f381b}\n#s6-v2 .formation-link{position:absolute;bottom:1cqw;left:38%;font-size:2.5cqw;min-height:5cqw;z-index:2}\n#s6-v2 .experience{display:flex;align-items:center;gap:2cqw;padding:0 5cqw}\n#s6-v2 progress{width:100%;height:2.3cqw;border-radius:8px;overflow:hidden;accent-color:#ffce32}\n#s6-v2 .experience small{white-space:nowrap}\n#s6-v2 .hero-skills{display:grid;grid-template-columns:repeat(5,1fr);gap:1.8cqw}\n#s6-v2 .hero-skills button{flex-direction:column;font-size:2.8cqw;gap:.4cqw}\n#s6-v2 .hero-skills img,#s6-v2 .hero-skills .skill-symbol{width:12cqw;height:12cqw}\n#s6-v2 .hero-skills b{font-size:2.8cqw}\n#s6-v2 .unavailable{filter:grayscale(.9);opacity:.7}\n#s6-v2 .skill-symbol{display:flex;align-items:center;justify-content:center;border-radius:2cqw;color:white;font-size:10cqw;text-shadow:0 0 8px #fff;background:radial-gradient(#fff897,#ffae00 55%,#d85900)}\n#s6-v2 .skill-symbol.heal{background:radial-gradient(#eeff8e,#7bcf08 60%,#459a08)}\n#s6-v2 .attributes .stat-row{font-size:2.9cqw;min-height:4.7cqw}\n#s6-v2 .part-tabs{display:flex;gap:.7cqw;padding:0 1cqw}\n#s6-v2 .part-tabs button{flex:1;padding:.5cqw;min-width:0;font-size:6cqw;height:10cqw}\n#s6-v2 .part-tabs img{width:8cqw;height:8cqw}\n#s6-v2 .filter-row{display:flex;justify-content:space-between;padding:0 2cqw}\n#s6-v2 .filter-row button{font-size:3.4cqw;min-height:6.5cqw;border-radius:8cqw}\n#s6-v2 .five-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1.5cqw;align-content:start}\n#s6-v2 .five-grid>.flat{display:block;min-width:0}\n#s6-v2 .bag-scroll{flex:1;min-height:0;overflow:auto;padding:2.5cqw;scrollbar-color:#f8b71a #f6dbba;scrollbar-width:thin}\n#s6-v2 .bag-footer{display:flex;align-items:center;justify-content:space-between;gap:1cqw;font-size:3cqw;padding:1cqw 2cqw}\n#s6-v2 .bag-footer button{font-size:3cqw;padding:1cqw 2cqw;border-radius:6cqw}\n#s6-v2 .bag-page>.main-tabs{margin-top:1cqw}\n#s6-v2 .empty-message{grid-column:1/-1;text-align:center;opacity:.7;padding:4cqw}\n#s6-v2 .reward{aspect-ratio:1;position:relative;background:#48b7e5;border-radius:1.8cqw;overflow:hidden;min-width:0}\n#s6-v2 .reward>img{height:90%;width:90%;margin:2% 5%}\n#s6-v2 .reward>b{position:absolute;right:5%;bottom:1%;color:#fff;font-size:3cqw;text-shadow:1px 1px #563d21,-1px -1px #563d21}\n#s6-v2 .reward>small{display:none}\n#s6-v2 .recruit-page{background-size:cover;background-position:center}\n#s6-v2 .ticket-wallet{position:absolute;top:2.2cqw;right:2.5cqw;color:#fff;display:flex;align-items:center;gap:1cqw;font-size:2.6cqw}\n#s6-v2 .ticket-wallet .resource{font-size:3cqw}\n#s6-v2 .recruit-page>.main-tabs{margin-top:1cqw;z-index:1}\n#s6-v2 .recruit-cast{position:relative;flex:1;min-height:35cqw}\n#s6-v2 .recruit-cast .face{position:absolute;object-fit:contain}\n#s6-v2 .cast-center{width:65%;height:90%;left:17%;top:8%;z-index:2}\n#s6-v2 .cast-left{width:53%;height:70%;left:-7%;top:0}\n#s6-v2 .cast-right{width:53%;height:70%;right:-7%;top:-4%}\n#s6-v2 .recruit-caption{text-align:center;color:#fff3b7;text-shadow:0 2px 2px #4d2861}\n#s6-v2 .recruit-caption h1{font-size:8cqw}\n#s6-v2 .recruit-caption p{font-size:3.5cqw}\n#s6-v2 .recruit-bottom{color:#fff8e8;padding:1cqw 3cqw;display:flex;flex-direction:column;gap:1.8cqw}\n#s6-v2 .pool-links{display:flex;gap:2cqw;justify-content:center}\n#s6-v2 .pool-links button{min-height:5.5cqw;font-size:3cqw}\n#s6-v2 .pity{display:flex;justify-content:space-between;font-size:3.3cqw}\n#s6-v2 .pity em{color:#ffed64}\n#s6-v2 .recruit-bottom .page-actions button{min-width:42%;flex-direction:column;padding:.8cqw;font-size:4cqw;min-height:10cqw}\n#s6-v2 .recruit-page>.v2-nav{margin-top:0}\n#s6-v2 .dungeon-list{flex:1;overflow:auto;display:flex;flex-direction:column;gap:2cqw;padding:1cqw;min-height:0}\n#s6-v2 .dungeon-card{display:grid;grid-template-columns:46% 54%;background:#fff2df;border-radius:3cqw;padding:1cqw;gap:0;min-height:0;flex:1;max-height:31cqw;box-shadow:0 1px 2px #a86a351a}\n#s6-v2 .dungeon-card>img{width:100%;height:100%;object-fit:cover;border-radius:2cqw;min-height:0}\n#s6-v2 .dungeon-card>div{display:flex;flex-direction:column;padding:.7cqw 1.8cqw;gap:1cqw;min-width:0}\n#s6-v2 .dungeon-card h2{font-size:4cqw;text-align:center}\n#s6-v2 .drop-icons{display:flex;gap:1cqw;flex:1;min-height:0;justify-content:center;align-items:center}\n#s6-v2 .drop-icons>.reward{width:11cqw;max-height:12cqw}\n#s6-v2 .drop-icons>img{width:10cqw;height:10cqw;background:#42b4e7;border-radius:1cqw}\n#s6-v2 .dungeon-card footer{display:flex;align-items:center;justify-content:space-between;gap:.5cqw}\n#s6-v2 .dungeon-card footer button{font-size:3.3cqw;min-height:6cqw;padding:.3cqw 4cqw;border-radius:8cqw}\n#s6-v2 .dungeon-card footer small{font-size:2.6cqw;white-space:nowrap}\n#s6-v2 .endless-note{text-align:center;padding:7cqw;background:#fff2dfaa;border-radius:3cqw;font-size:3.5cqw;line-height:1.8}\n#s6-v2 .v2-modal-host{position:absolute;inset:0;pointer-events:none;z-index:50}\n#s6-v2 .v2-scrim{position:absolute;inset:0;background:#18291fc2;backdrop-filter:blur(2px);pointer-events:auto;display:flex;align-items:center;justify-content:center;padding:4cqw}\n#s6-v2 .v2-dialog{outline:0;width:100%;max-height:91%;border:3px solid #dda848;border-radius:4cqw;background:linear-gradient(125deg,#fff8e8,#ffeed4);box-shadow:inset 0 0 0 2px #fff4d3,0 5px 20px #080d0a66;padding:0 3.5cqw 3cqw;display:flex;flex-direction:column;gap:2cqw;position:relative;font-size:3.2cqw}\n#s6-v2 .dialog-head{min-height:9cqw;display:flex;justify-content:center;align-items:center;margin:-2cqw 0 0}\n#s6-v2 .dialog-head h2{background:linear-gradient(#ffe3a1,#ffc779);border:2px solid #f4c672;border-radius:4cqw;padding:1.4cqw 7cqw;font-size:4.6cqw;box-shadow:0 2px 2px #ac722636}\n#s6-v2 .dialog-head .close{position:absolute;right:-2cqw;top:-2cqw;padding:0;background:linear-gradient(#ffd879,#f6a32c);border:2px solid #fff2b8;color:#fff;font-size:7cqw;line-height:1;border-radius:50%;width:8cqw;height:8cqw;min-height:0}\n#s6-v2 .dialog-body{overflow:auto;min-height:0;scrollbar-width:thin;scrollbar-color:#efb84f #fae1bd;display:flex;flex-direction:column;gap:1.2cqw}\n#s6-v2 .dialog-actions{display:flex;justify-content:center;gap:3cqw;padding-top:1cqw}\n#s6-v2 .dialog-actions button{min-width:31%;font-size:3.8cqw;min-height:8cqw;flex-direction:column;border-radius:8cqw}\n#s6-v2 .outside-hint{position:absolute;bottom:1.5%;color:#fff1d0;font-size:3cqw}\n#s6-v2 .small{max-width:84%;gap:2cqw}\n#s6-v2 .small .info-pad{min-height:16cqw;font-size:3.4cqw;line-height:1.8;justify-content:center}\n#s6-v2 .info-pad{background:#f1e4cf;border:1px solid #f8efde;border-radius:2cqw;padding:2.5cqw;line-height:1.65;white-space:pre-line;font-size:3.2cqw}\n#s6-v2 .info-pad.compact{padding:1.6cqw;font-size:2.8cqw}\n#s6-v2 .item-heading{display:flex;align-items:center;gap:3cqw;position:relative;padding:1cqw 0}\n#s6-v2 .item-heading>.gear-tile,#s6-v2 .item-heading>.face{width:22%;flex-shrink:0}\n#s6-v2 .item-heading>div:not(.gear-tile){display:flex;flex-direction:column;gap:1cqw}\n#s6-v2 .lock-button{margin-left:auto;font-size:5cqw}\n#s6-v2 .equip-owner{font-size:2.7cqw;text-align:center}\n#s6-v2 .skill-preview img,#s6-v2 .skill-preview .skill-symbol{width:17cqw;height:17cqw}\n#s6-v2 .equipment-scroll{height:66cqw;overflow:auto;padding:1cqw;scrollbar-width:thin}\n#s6-v2 .filter-options{display:grid;grid-template-columns:repeat(3,1fr);gap:2cqw;padding:2cqw}\n#s6-v2 .salvage-scroll{height:59cqw}\n#s6-v2 .quality-checks{display:flex;flex-wrap:wrap;gap:1cqw}\n#s6-v2 .quality-checks button{font-size:2.7cqw;padding:1cqw 1.4cqw;min-height:5cqw}\n#s6-v2 .list-heading{display:flex;justify-content:space-between;font-size:3.3cqw}\n#s6-v2 .checked{position:absolute;left:0;bottom:0;background:#ffe24c;border-radius:50%;font-size:4cqw;padding:0 1cqw}\n#s6-v2 .material-line{display:flex;align-items:center;justify-content:center;gap:2cqw;font-size:3cqw}\n#s6-v2 .material-line img{height:6cqw;width:6cqw}\n#s6-v2 .reward-scroll{height:39cqw;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:#f7bd36 #f5e0bd;background:#f6e6ce;border-radius:2cqw;padding:1.6cqw}\n#s6-v2 .offline-rates{display:flex;gap:2cqw;justify-content:center}\n#s6-v2 .offline-rates .resource{font-size:2.7cqw}\n#s6-v2 .challenge-heading{display:flex;gap:2cqw;align-items:center}\n#s6-v2 .challenge-heading>img{width:34%;aspect-ratio:1.4;object-fit:cover;border-radius:2cqw}\n#s6-v2 .challenge-cost{display:flex;align-items:center;justify-content:center;font-size:3cqw}\n#s6-v2 .challenge-cost img{width:5cqw;height:5cqw}\n#s6-v2 .pool-name{text-align:center}\n#s6-v2 .pool-heroes{display:grid;grid-template-columns:repeat(4,1fr);gap:2cqw}\n#s6-v2 .hero-card{background:linear-gradient(130deg,#fff7,#fff0),var(--quality);border:2px solid #fff1bf;border-radius:2cqw;padding:1cqw;display:flex;flex-direction:column;position:relative;overflow:hidden;text-align:center;min-width:0;box-shadow:0 2px 2px #65452e33}\n#s6-v2 .hero-card>.face{width:100%;aspect-ratio:1}\n#s6-v2 .hero-card>b{font-size:3cqw}\n#s6-v2 .hero-card>small{font-size:2.1cqw;white-space:nowrap}\n#s6-v2 .hero-role{font-size:2cqw;text-align:left}\n#s6-v2 .hero-card.locked{filter:grayscale(.8);opacity:.65}\n#s6-v2 .new{position:absolute;top:1%;right:0;font:italic 800 2.5cqw sans-serif;background:#ff593d;color:white;padding:.4cqw 1cqw;z-index:1}\n#s6-v2 .fullscreen{background:transparent;border:0;box-shadow:none;color:#fff6db;gap:4cqw;padding:0;max-height:95%}\n#s6-v2 .fullscreen .dialog-head h2{background:none;border:0;box-shadow:none;font-size:8cqw;color:#ffed97;text-shadow:0 2px 2px #b36c17}\n#s6-v2 .fullscreen .close{display:none}\n#s6-v2 .fullscreen .dialog-body{gap:3cqw;text-align:center}\n#s6-v2 .fullscreen .dialog-actions{padding-top:7cqw}\n#s6-v2 .fullscreen .hero-card{color:#653b21}\n#s6-v2 .result-cards{gap:1.5cqw}\n#s6-v2 .result-cards.single{width:34cqw;align-self:center}\n#s6-v2 .result-cards.single .hero-card>b{font-size:5cqw}\n#s6-v2 .rewards-fullscreen .reward-scroll{background:#a3713233;height:46cqw;padding:2cqw 0}\n#s6-v2 .secondary{padding:0;gap:0}\n#s6-v2 .title-plaque{display:table;margin:2cqw auto!important;padding:1.6cqw 7cqw;background:linear-gradient(#fff4d8,#ffdfa6);border:2px solid #efbd66;border-radius:2cqw;box-shadow:inset 0 0 0 2px #fff9df;font-size:5cqw}\n#s6-v2 .forge-scene{height:42%;position:relative;background-size:cover;background-position:center;flex-shrink:0}\n#s6-v2 .forge-scene .wallet{position:absolute;top:1cqw;left:1cqw}\n#s6-v2 .forge-scene>.title-plaque{position:relative;width:max-content;font-size:4.5cqw}\n#s6-v2 .forge-item{position:absolute;top:12cqw;left:3cqw;display:flex;gap:1.5cqw;align-items:center}\n#s6-v2 .forge-item>.gear-tile{width:15cqw}\n#s6-v2 .forge-item h2{font-size:3.7cqw}\n#s6-v2 .forge-item p{font-size:2.6cqw}\n#s6-v2 .forge-weapon{position:absolute;width:27%;height:40%;left:35%;bottom:15%;filter:drop-shadow(0 0 8px #ffdf61)}\n#s6-v2 .upgrade-body{padding:1cqw 5cqw 2cqw;display:flex;flex-direction:column;flex:1;gap:.8cqw}\n#s6-v2 .level-preview{text-align:center;padding:1cqw 0 2cqw;font-size:5.7cqw}\n#s6-v2 .upgrade-body .stat-row{margin:.5cqw 0;padding:1cqw 2.5cqw}\n#s6-v2 .upgrade-body .section-title{margin-top:1cqw}\n#s6-v2 .upgrade-costs{display:flex;align-items:center;justify-content:space-around;gap:4cqw;margin-top:auto;padding-top:2cqw;font-size:3cqw}\n#s6-v2 .upgrade-costs>div{display:flex;flex-direction:column;align-items:center;gap:.4cqw}\n#s6-v2 .upgrade-costs .reward{width:10cqw;background:transparent;border:1px solid #d7b38d}\n#s6-v2 .upgrade-costs .reward>b{display:none}\n#s6-v2 .upgrade-costs button{min-width:33%;border-radius:8cqw;font-size:4.2cqw}\n#s6-v2 .secondary-close{align-self:center;width:40%;font-size:4.5cqw;margin:3cqw 0 2cqw;border-radius:9cqw}\n#s6-v2 .breakthrough-note{display:flex;align-items:center;justify-content:center;color:#9d6b36;font-size:2.8cqw;margin-top:1cqw}\n#s6-v2 .breakthrough-note:before,#s6-v2 .breakthrough-note:after{content:'';height:1px;background:#e5bc76;flex:1}\n#s6-v2 .formation-scene{height:37%;background-position:center;background-size:cover;position:relative}\n#s6-v2 .standing-heroes{position:absolute;inset:17% 3% 0;display:flex;justify-content:space-around;align-items:center}\n#s6-v2 .standing-heroes .standing{width:29%;padding:0;background:none;box-shadow:none;border:0;display:flex;flex-direction:column;font-size:3cqw}\n#s6-v2 .standing img{width:100%;height:22cqw}\n#s6-v2 .standing small{background:#fff0ccdd;border-radius:3cqw;padding:0 2cqw}\n#s6-v2 .slot0{transform:translateY(6cqw)}\n#s6-v2 .empty-position{border:2px dashed #bca77b;background:#f7ebcd66;width:22%;height:14cqw}\n#s6-v2 .formation-toolbar{display:flex;align-items:center;justify-content:space-between;gap:1cqw;padding:2cqw;font-size:3cqw}\n#s6-v2 .formation-toolbar>div{display:flex;gap:1cqw}\n#s6-v2 .formation-toolbar>div button{padding:0;width:6cqw;min-height:6cqw;border-radius:50%}\n#s6-v2 .formation-toolbar>button{font-size:2.7cqw;min-height:6cqw;padding:1cqw 2cqw}\n#s6-v2 .roster-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2cqw;padding:2cqw 3cqw;flex:1;align-content:start;overflow:auto}\n#s6-v2 .roster-grid button{display:block;position:relative;align-self:start}\n#s6-v2 .deployed{position:absolute;right:1cqw;top:1cqw;height:max-content;background:#ee8c51;color:white;font-size:2.5cqw;padding:.3cqw 1cqw}\n#s6-v2 .formation-types>button{padding:2cqw 1cqw;flex-direction:column;gap:2cqw}\n#s6-v2 .formation-mini{display:flex}\n#s6-v2 .formation-mini>div{display:flex;flex-direction:column;width:33%}\n#s6-v2 .formation-mini img{width:100%}\n#s6-v2 .formation-mini b{font-size:3cqw}\n#s6-v2 .talent-wallet{text-align:center}\n#s6-v2 .talent-tree{position:relative;height:65cqw;min-height:65cqw;background:radial-gradient(ellipse,#b1d26a44,transparent 70%)}\n#s6-v2 .talent-tree svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}\n#s6-v2 .talent-tree path{fill:none;stroke:#a3843c;stroke-width:1.2;stroke-linecap:round}\n#s6-v2 .talent-node{position:absolute;transform:translate(-50%,-50%);width:8cqw;height:8cqw;min-height:0;border-radius:50%;padding:0;font-size:4cqw;background:linear-gradient(#e1dac7,#cbbf9c)}\n#s6-v2 .talent-node.learned{background:linear-gradient(#fff06e,#efa51d);box-shadow:0 0 5px #ffc600}\n#s6-v2 .flow-node{left:50%;top:95%}\n#s6-v2 .v2-toast{position:absolute;bottom:25%;left:10%;width:80%;text-align:center;background:#4b3527ef;color:#fff4d6;padding:2cqw 3cqw;border-radius:2cqw;opacity:0;transition:opacity .15s;z-index:100;font-size:3.5cqw;pointer-events:none}\n#s6-v2 .v2-toast.visible{opacity:1}\n#s6-v2 .battle-hud{height:100%;position:relative;padding:1cqw;pointer-events:none;display:flex;flex-direction:column}\n#s6-v2 .battle-hud>.wallet{flex-direction:column;align-items:flex-start;position:absolute;top:1cqw;left:10cqw;gap:.6cqw;z-index:1}\n#s6-v2 .battle-hud .resource{height:4.7cqw;font-size:2.8cqw}\n#s6-v2 .battle-hud .resource img{height:5.5cqw;width:5.5cqw}\n#s6-v2 .menu{position:absolute;left:1cqw;top:1cqw;width:8cqw;height:8cqw;font-size:6cqw;padding:0}\n#s6-v2 .stage-heading{text-align:center;margin-top:1cqw;min-height:19cqw;display:flex;flex-direction:column;align-items:center;margin-left:24cqw}\n#s6-v2 .stage-heading h1{font-size:5.8cqw;text-shadow:1px 1px #fff5d0,-1px -1px #fff5d0}\n#s6-v2 .stage-heading>b{font-size:3.8cqw}\n#s6-v2 .checkpoint{display:flex;align-items:center;gap:4cqw;border-top:2px solid #fff1ca;margin-top:2cqw;height:2cqw;color:#7b5c32}\n#s6-v2 .checkpoint i{width:2.5cqw;height:2.5cqw;background:#73be31;border:1px solid #fff7d2;border-radius:50%;display:block;margin-top:-2cqw}\n#s6-v2 .turn-order{display:flex;align-items:center;justify-content:center;gap:1cqw;font-size:3cqw;margin-top:2cqw;height:8cqw}\n#s6-v2 .turn-order>.face{width:7cqw;height:7cqw}\n#s6-v2 .monster-turn{width:7cqw;height:7cqw;border-radius:50%;background:#a4dc62;color:#45632f;display:flex;align-items:center;justify-content:center;font-size:5cqw}\n#s6-v2 .battle-tools{position:absolute;right:2cqw;top:34cqw;display:flex;flex-direction:column;gap:1.5cqw}\n#s6-v2 .battle-tools button{width:8cqw;height:8cqw;min-height:0;padding:0;flex-direction:column;font-size:4cqw;gap:0;border-radius:2.4cqw}\n#s6-v2 .battle-tools small{font-size:1.8cqw}\n#s6-v2 .battle-tools .on:after{content:'';position:absolute;right:-.4cqw;top:-.4cqw;background:#78d02d;width:1.8cqw;height:1.8cqw;border:1px solid #fff;border-radius:50%}\n#s6-v2 .field-actions{margin-top:auto;display:flex;gap:2cqw;padding:1cqw 2cqw}\n#s6-v2 .field-actions button{min-height:6.5cqw;border-radius:6cqw;padding:.5cqw 3cqw;font-size:3.4cqw}\n#s6-v2 .skill-bar{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));background:linear-gradient(#fff3e1,#ffeed5);pointer-events:auto;padding:2cqw 1cqw;min-height:36cqw;gap:1.8cqw;border-top:1px solid #fff6cf}\n#s6-v2 .party-card{min-width:0;border-right:1px solid #edd1ad;padding-right:1cqw}\n#s6-v2 .party-card:last-child{border-right:0}\n#s6-v2 .party-card>header{display:flex;align-items:center;min-height:12cqw}\n#s6-v2 .party-card>header>.face{width:11cqw;height:11cqw;border:1px solid #edd1ad;border-radius:50%;background:#fff0d5}\n#s6-v2 .party-card>header>div{flex:1;min-width:0;display:flex;flex-direction:column;gap:.3cqw}\n#s6-v2 .party-card b{font-size:3cqw}\n#s6-v2 .party-card small{font-size:2.2cqw;white-space:nowrap}\n#s6-v2 .health-track{height:1.7cqw;background:#c8ae83;border:1px solid #675326;border-radius:8px;overflow:hidden}\n#s6-v2 .health-track i{display:block;height:100%;background:linear-gradient(#c9ff75,#74ca19)}\n#s6-v2 .active-skills{display:grid;grid-template-columns:1fr 1fr;gap:1.2cqw;margin-top:1.5cqw}\n#s6-v2 .skill-button{display:flex;flex-direction:column;background:none;box-shadow:none;border:0;padding:0;min-width:0}\n#s6-v2 .skill-button>img,#s6-v2 .skill-button>.skill-symbol{width:12cqw;height:12cqw;object-fit:contain;border-radius:2cqw;background:radial-gradient(#fff6a1,#e9b535)}\n#s6-v2 .skill-button>span[data-cooldown]{position:absolute;top:30%;color:white;text-shadow:0 1px 2px #3b2411;font-size:4cqw}\n#s6-v2 .battle-hud>.v2-nav{background:#fff0d7;margin:0;padding:1cqw}\n#s6-v2 .battle-hud>.v2-nav button{min-height:13cqw}\n#s6-v2 .page>.wallet{flex-shrink:0}\n#s6-v2 .hero-stage{flex:none;height:76cqw;min-height:76cqw;max-height:76cqw}\n#s6-v2 .bag-page,#s6-v2 .dungeon-page{background-size:100% 18cqw}\n#s6-v2 .hero-page{background-image:linear-gradient(transparent 0%,transparent 42%,#fce7ce 52%),var(--scene);background-size:100% 100%,100% auto}\n#s6-v2 .recruit-bottom .v2-button{color:var(--ink)}\n\n#s6-v2 .v2-button{--button-art:var(--gold-art)}\n#s6-v2 .v2-button.quiet{--button-art:var(--cream-art)}\n#s6-v2 .v2-button.selected{--button-art:var(--gold-art)}\n#s6-v2 .v2-button:not(.flat):not(.equipment-slot):not(.talent-node):not(.standing):not(.skill-button){background:none;border-image:var(--button-art) 65 150 fill / 8px 18px stretch;box-shadow:none}\n#s6-v2 .dialog-head .close{border-image:none!important;background-image:var(--close-art)!important;background-size:100% 100%!important;border:0!important;color:transparent!important}\n#s6-v2 .v2-dialog:not(.fullscreen){border-image:var(--panel-art) 75 fill / 22px stretch;background:none;border-width:12px;padding:0 2cqw 2cqw}\n#s6-v2 .dialog-head h2{background-image:var(--plaque-art);background-size:100% 100%;border:0;box-shadow:none;padding:2.5cqw 7cqw}\n#s6-v2 .v2-button.flat{border-image:none}\n#s6-v2 .up-ticket{filter:hue-rotate(290deg)}\n#s6-v2 .empty-position{border-image:none!important;background:#f7ebcd66!important}\n#s6-v2 .empty-slot-symbol{display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:7cqw;color:#a89984}\n#s6-v2 .equipment-slot small{font-size:3cqw;line-height:1.3}\n#s6-v2 .hero-tabs button{height:10cqw}\n#s6-v2 .hero-tabs img{width:9cqw}\n#s6-v2 .bag-page,#s6-v2 .dungeon-page{background-image:linear-gradient(transparent 0 16cqw,#fce7ce 18cqw),var(--scene);background-size:100% 100%,100% auto;background-position:top,center top}\n#s6-v2 .dungeon-card{max-height:39cqw}\n#s6-v2 .stage-heading small{font-size:2.8cqw}\n#s6-v2 .battle-tools small{font-size:1.7cqw;white-space:nowrap;line-height:1.2}\n#s6-v2 .turn-portrait{width:7cqw;height:7cqw;display:flex;align-items:center;border-radius:50%;border:1px solid transparent}\n#s6-v2 .turn-portrait img{width:100%;height:100%}\n#s6-v2 .turn-portrait.turn-current{border-color:#ffe250;filter:drop-shadow(0 0 3px #fff460)}\n#s6-v2 .field-actions img{width:5cqw;height:5cqw}#s6-v2 .battle-tools img{width:4.5cqw;height:4.5cqw}\n#s6-v2 .field-actions{background:linear-gradient(transparent,#daeabd88)}\n#s6-v2 .party-card small{font-size:2.5cqw}\n#s6-v2 .skill-button small{font-size:2.7cqw}\n#s6-v2 .v2-nav button{font-size:3.8cqw;min-height:14cqw}\n#s6-v2 .hero-page{overflow-y:auto}\n#s6-v2 .hero-page>.v2-nav{position:sticky;bottom:0;background:#fce7ce;z-index:4;flex-shrink:0}\n#s6-v2 .hero-page>.cream-card,#s6-v2 .hero-page>.hero-tabs,#s6-v2 .hero-page>.page-actions{flex-shrink:0}\n@media(max-height:650px){#s6-v2 .hero-stage{min-height:35cqw}\n#s6-v2 .hero-skills img,#s6-v2 .hero-skills .skill-symbol{width:9cqw;height:9cqw}\n#s6-v2 .attributes .stat-row{min-height:3.6cqw}\n#s6-v2 .page{gap:.7cqw}\n#s6-v2 .skill-bar{min-height:31cqw}\n#s6-v2 .v2-dialog{max-height:94%}}@media(prefers-reduced-motion:reduce){#s6-v2 *{transition:none!important}}\n/* ---- Concept-fidelity skin (2026-11-18): plaques, rows, fullscreen results, feature pages ---- */\n#s6-v2 .ico{width:1.15em;height:1.15em;fill:currentColor;flex-shrink:0;vertical-align:-.18em}\n#s6-v2 .ico.mirror,#s6-v2 .laurel.mirror{transform:scaleX(-1)}\n#s6-v2 .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n#s6-v2 .v2-button{color:#5d3216}\n#s6-v2 .v2-button.peach{border-image:var(--peach-art) 46 90 fill / 8px 18px stretch!important;color:#6b2f12}\n#s6-v2 .wide{min-width:56%!important}\n#s6-v2 .wallet{gap:2.4cqw}\n#s6-v2 .page>.wallet .resource{height:7.4cqw;font-size:3.9cqw;padding:0 3cqw 0 .3cqw}\n#s6-v2 .page>.wallet .resource img{height:8.4cqw;width:8.4cqw}\n#s6-v2 .main-tabs button{font-size:4.4cqw;min-height:9.6cqw}\n#s6-v2 .filter-row button{font-size:3.6cqw;min-height:8cqw;padding:1cqw 3.6cqw;gap:1.2cqw}\n#s6-v2 .filter-row .ico{width:4.4cqw;height:4.4cqw}\n#s6-v2 .exp-track{width:100%;height:2.4cqw;background:#c9b495;border-radius:2cqw;overflow:hidden;box-shadow:inset 0 1px 2px #0003}\n#s6-v2 .exp-track i{display:block;height:100%;background:linear-gradient(#a8ef5a,#4fae1d);border-radius:2cqw}\n/* plaque */\n#s6-v2 .plaque{position:relative;display:inline-flex;align-items:center;padding:0 2.8cqw!important;background:none!important;border:0!important;box-shadow:none!important;filter:drop-shadow(0 2px 1.5px #9b5f1c55)}\n#s6-v2 .plaque:before,#s6-v2 .plaque:after{content:'';position:absolute;top:50%;width:6.4cqw;height:6.4cqw;background:linear-gradient(135deg,#fffaf0,#ffdba0);border:2px solid #d9a24c;transform:translateY(-50%) rotate(45deg);border-radius:.9cqw}\n#s6-v2 .plaque:before{left:.4cqw}\n#s6-v2 .plaque:after{right:.4cqw}\n#s6-v2 .plate{position:relative;z-index:1;display:flex;align-items:center;gap:2.4cqw;padding:1.5cqw 4.6cqw;background:linear-gradient(#fffbf2,#ffe3ab);border-top:2px solid #d9a24c;border-bottom:2px solid #d9a24c;box-shadow:inset 0 2px #fff,inset 0 -2px #fff0d0;font-size:5cqw;color:#5d3216;line-height:1.25;white-space:nowrap}\n#s6-v2 .plate>i{font-style:normal;color:#d8962d;font-size:3cqw}\n#s6-v2 .dialog-head .plate>i:first-child:before,#s6-v2 .dialog-head .plate>i:last-child:before{content:'';position:absolute;top:-4cqw;width:8.5cqw;height:5.4cqw;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 24'%3E%3Cpath d='M21 23C15 14 7 12 2 14c5-9 14-8 19 9z' fill='%2387c540' stroke='%23507d22' stroke-width='1.4'/%3E%3Cpath d='M21 23c1-10 8-17 17-16-3 9-9 13-17 16z' fill='%23a3d856' stroke='%23507d22' stroke-width='1.4'/%3E%3C/svg%3E\") center/contain no-repeat}\n#s6-v2 .dialog-head .plate>i:first-child:before{left:-7cqw}\n#s6-v2 .dialog-head .plate>i:last-child:before{right:-7cqw;transform:scaleX(-1)}\n/* dialogs */\n#s6-v2 .v2-scrim{flex-direction:column;gap:2.6cqw;padding:5cqw 4cqw;background:#2a2116b8;backdrop-filter:blur(1.5px)}\n#s6-v2 .v2-scrim.dark{background:radial-gradient(ellipse at 50% 38%,#26304fe6,#0c1020f2 75%)}\n#s6-v2 .v2-dialog.small{width:78cqw;max-width:none}\n#s6-v2 .v2-dialog.medium{width:82cqw}\n#s6-v2 .v2-dialog.large{width:90cqw}\n#s6-v2 .v2-dialog:not(.fullscreen){border-width:14px;border-image:var(--panel-art) 75 fill / 26px stretch;padding:0 2.4cqw 2.6cqw;max-height:86%;gap:1.6cqw}\n#s6-v2 .dialog-head:not(.celebrate){margin:-8.6cqw 0 0;min-height:10cqw}\n#s6-v2 .dialog-head .close{right:-6.4cqw;top:-6.2cqw;width:10cqw;height:10cqw}\n#s6-v2 .outside-hint{position:static;display:flex;gap:1.6cqw;align-items:center;color:#fff3d6;font-size:3.3cqw;cursor:pointer;pointer-events:auto;text-shadow:0 1px 2px #0008}\n#s6-v2 .outside-hint .ico{color:#e8d7a0;width:3.6cqw;height:3.6cqw}\n#s6-v2 .dialog-body{gap:1.3cqw;padding:0 .6cqw}\n#s6-v2 .dialog-actions{gap:3.6cqw;padding-top:1.4cqw}\n#s6-v2 .dialog-actions button{min-width:39%;min-height:11.5cqw;font-size:4.8cqw}\n#s6-v2 .dialog-actions button small{font-size:3.1cqw;display:flex;align-items:center;gap:.4cqw}\n#s6-v2 .dialog-actions:has(.warn),#s6-v2 .dialog-actions:has(.challenge-cost){flex-direction:column;align-items:center;gap:1cqw}\n#s6-v2 .warn{display:flex;align-items:center;gap:1cqw;color:#8c5a35;font-size:3cqw}\n#s6-v2 .warn .ico{color:#e0702b}\n#s6-v2 .info-pad{background:#f3e2c8;border:0;border-radius:2.6cqw;text-align:center;font-size:3.7cqw;line-height:1.9;white-space:normal}\n#s6-v2 .info-pad small{display:block;font-size:3.1cqw;color:#86664a}\n#s6-v2 .info-pad b{font-size:4.2cqw}\n#s6-v2 .inline-icon{width:6cqw;height:6cqw;vertical-align:middle}\n#s6-v2 .section-title{display:flex!important;align-items:center;gap:1.6cqw;width:100%;background:none!important;padding:0!important;margin:.8cqw 0 .2cqw!important;font-size:3.8cqw!important}\n#s6-v2 .section-title>span{display:inline-flex;align-items:center;gap:1cqw;background:linear-gradient(90deg,#ffd38a,#ffe6bb 75%,#ffe6bb00);border-radius:4cqw;padding:.5cqw 5cqw .5cqw 1.6cqw;color:#5d3216}\n#s6-v2 .section-title>span .ico{color:#a8661f;width:4cqw;height:4cqw}\n#s6-v2 .section-title:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,#e9c689,transparent)}\n#s6-v2 .section-title.effect>span .ico{color:#9a4fd0}\n#s6-v2 .ornament-line{display:flex;align-items:center;gap:2cqw;color:#e0ad55;font-size:2.4cqw;margin:.4cqw 0}\n#s6-v2 .ornament-line:before,#s6-v2 .ornament-line:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,#e5c287,transparent)}\n#s6-v2 .ornament-line i{font-style:normal}\n#s6-v2 .stat-row{background:linear-gradient(90deg,#f9d9b0,#fde8cd);border-radius:4cqw;padding:.9cqw 3.2cqw;margin:.45cqw 0;font-size:3.6cqw;min-height:6.4cqw}\n#s6-v2 .stat-row>span{display:inline-flex;align-items:center;gap:2.2cqw}\n#s6-v2 .stat-row .ico{color:#8b5530;width:4.2cqw;height:4.2cqw}\n#s6-v2 .stat-row.rate .ico{color:inherit;width:5.4cqw;height:5.4cqw}\n#s6-v2 .stat-row.rate i{display:inline-flex}\n#s6-v2 .change{display:inline-flex;align-items:center;gap:3cqw}\n#s6-v2 .change i{font-style:normal;color:#8b5530;font-size:.85em}\n#s6-v2 em.blue{color:#2e7fd8}\n#s6-v2 em.short{color:#d9412b!important}\n#s6-v2 .pill{display:inline-block;align-self:flex-start;background:#fbdfb8;border-radius:3cqw;padding:.3cqw 2.6cqw;font-size:3.2cqw;color:#7a4a26}\n#s6-v2 .quality-pill{display:inline-block;align-self:flex-start;background:color-mix(in srgb,var(--tone) 16%,#fff);color:var(--tone);border-radius:2cqw;padding:.2cqw 2.4cqw;font-size:3.2cqw}\n#s6-v2 .item-heading{gap:3.4cqw}\n#s6-v2 .item-heading h3{font-size:5cqw}\n#s6-v2 .item-heading>.gear-tile{width:25%;border:2px solid #fff3cf;box-shadow:0 2px 3px #6d462633}\n#s6-v2 .lock-button{position:absolute;right:1cqw;top:1.4cqw;width:8.5cqw}\n#s6-v2 .lock-button img{width:100%}\n#s6-v2 .effect-line{display:flex;align-items:center;gap:2cqw;padding:.6cqw 2cqw;font-size:3.5cqw}\n#s6-v2 .effect-line .ico{color:#46a530;width:6.4cqw;height:6.4cqw;background:#e7f6d6;border-radius:50%;padding:.6cqw}\n#s6-v2 .equip-owner{color:#86664a}\n#s6-v2 .gear-tile>img.gear-lock{position:absolute;right:3%;top:3%;width:27%;height:auto;padding:0}\n#s6-v2 .skill-preview img{width:20cqw;height:20cqw}\n#s6-v2 .portrait-tile{position:relative;aspect-ratio:1;border-radius:2.4cqw;background:linear-gradient(135deg,#ffffff66,transparent 60%),var(--quality);border:2px solid #fff3cf;box-shadow:0 2px 3px #6d462633;overflow:hidden;width:25%;flex-shrink:0}\n#s6-v2 .portrait-tile .face{width:100%;height:100%;object-fit:cover;object-position:50% 0;transform:scale(1.5);transform-origin:50% 14%}\n#s6-v2 .portrait-tile.small{width:17cqw}\n#s6-v2 .portrait-tile>b{position:absolute;right:5%;bottom:2%;color:#fff;font-size:3.8cqw;text-shadow:1px 1px #5f3b21,-1px -1px #5f3b21,1px -1px #5f3b21,-1px 1px #5f3b21}\n#s6-v2 .portrait-tile>small{position:absolute;left:0;right:0;bottom:0;background:#3d24127a;color:#fff;font-size:2.7cqw;text-align:center}\n#s6-v2 .up-mark{position:absolute;right:0;top:0;background:#ff5a3c;color:#fff;font:italic 800 2.7cqw sans-serif;padding:.2cqw 1.3cqw;border-radius:0 0 0 1.6cqw}\n#s6-v2 .star-change{display:flex;align-items:center;gap:2cqw;color:#f6b400;font-size:6.4cqw;text-shadow:0 1px #9f540f;letter-spacing:-.4cqw}\n#s6-v2 .star-change i{font-style:normal;color:#c9762c;font-size:4.4cqw;letter-spacing:0}\n#s6-v2 .cost-card{display:flex;align-items:center;gap:3.4cqw;background:#fbe5c6;border-radius:3cqw;padding:2.4cqw 3.4cqw}\n#s6-v2 .cost-card>div:last-child{border-left:1px solid #e3c08d;padding-left:3.4cqw;display:flex;flex-direction:column;gap:1cqw}\n#s6-v2 .cost-card h3{font-size:4.2cqw}\n#s6-v2 .cost-card p{font-size:3.4cqw}\n/* hero cards */\n#s6-v2 .hero-card{background:#fff6e6;border:2px solid #efd3a8;border-radius:2.8cqw;padding:1cqw 1cqw 1.2cqw;gap:.4cqw;align-items:center;color:#5d3216;overflow:visible}\n#s6-v2 .hero-card.locked{filter:none;opacity:1}\n#s6-v2 .hero-card .portrait{position:relative;width:100%;aspect-ratio:1.05;border-radius:2cqw;background:linear-gradient(135deg,#ffffff66,transparent 60%),var(--quality);overflow:hidden}\n#s6-v2 .hero-card .portrait .face{width:100%;height:100%;object-fit:contain;object-position:50% 100%;transform:scale(1.18);transform-origin:50% 0}\n#s6-v2 .hero-card.locked .portrait{background:#8f8578}\n#s6-v2 .hero-card.locked .portrait .face{filter:grayscale(1) brightness(.6)}\n#s6-v2 .hero-card>b{font-size:3.4cqw;line-height:1.2}\n#s6-v2 .role-badge{position:absolute;left:-.6cqw;top:-.6cqw;z-index:2;width:6.4cqw;height:6.4cqw;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 1px 2px #0005;color:#fff}\n#s6-v2 .role-badge .ico{width:3.8cqw;height:3.8cqw}\n#s6-v2 .r0{background:#e2463c}#s6-v2 .r1{background:#3d7fe0}#s6-v2 .r2{background:#e8a51c}#s6-v2 .r3{background:#55a735}\n#s6-v2 .star-row{display:inline-flex;gap:0;font-size:3.2cqw;line-height:1}\n#s6-v2 .star-row i{font-style:normal;color:#cfc8ba;text-shadow:0 1px #8b7b62}\n#s6-v2 .star-row i.on{color:#ffc21a;text-shadow:0 1px #a65d0b}\n#s6-v2 .deployed{position:absolute;left:7%;right:7%;bottom:5%;top:auto;height:auto;background:linear-gradient(#86d652,#3f9f26);color:#fff;font-size:2.8cqw;padding:.2cqw 0;text-align:center;clip-path:polygon(0 0,100% 0,95% 50%,100% 100%,0 100%,5% 50%)}\n#s6-v2 .card-tag{position:absolute;right:-.6cqw;top:-.6cqw;z-index:3;font:italic 900 2.8cqw sans-serif;padding:.4cqw 1.6cqw;border-radius:0 2cqw 0 2cqw;color:#fff;background:none}\n#s6-v2 .card-tag.new{background:linear-gradient(#ff7b4b,#ea3a2a);box-shadow:0 1px 2px #0004}\n#s6-v2 .card-tag.dup{background:#5d4a3acc;font:700 2.5cqw sans-serif}\n#s6-v2 .card-lock{position:absolute;right:5%;top:5%;width:26%}\n/* fullscreen results */\n#s6-v2 .fullscreen{width:100%!important;max-width:none!important;color:#fff5dc}\n#s6-v2 .dialog-head.celebrate{margin:0;gap:1cqw;align-items:center;min-height:0}\n#s6-v2 .celebrate h2{font-size:10.5cqw;color:#ffeaa4;-webkit-text-stroke:.55cqw #7a3d0c;paint-order:stroke fill;text-shadow:0 .9cqw 0 #6a320b,0 0 7cqw #ffcf4d;background:none!important;padding:0 1cqw!important;letter-spacing:.6cqw;border:0;box-shadow:none}\n#s6-v2 .laurel{width:9cqw;height:14cqw;fill:#f3b72c;stroke:#a8620f;stroke-width:.8;flex-shrink:0}\n#s6-v2 .rewards-fullscreen .dialog-head{background:radial-gradient(ellipse at 50% 62%,#ffc94f99,#ffc94f22 40%,transparent 66%);padding:9cqw 0 4cqw}\n#s6-v2 .rewards-fullscreen .reward-scroll{background:linear-gradient(90deg,#20140a55,#3a240fbb 12%,#3a240fbb 88%,#20140a55);border:0;border-top:1.5px solid #e9b24c;border-bottom:1.5px solid #e9b24c;height:56cqw;max-height:none;border-radius:0;padding:4cqw 6cqw}\n#s6-v2 .results-screen .dialog-body{gap:3cqw;align-items:center}\n#s6-v2 .result-sub{background:linear-gradient(90deg,transparent,#00000077,transparent);padding:1cqw 12cqw;font-size:4.2cqw;color:#fff4dc}\n#s6-v2 .result-sub em{color:#ffd54a;font-size:5.4cqw;margin:0 .6cqw}\n#s6-v2 .result-cards.five-grid{gap:2.2cqw;padding:0 1.4cqw;width:100%}\n#s6-v2 .result-cards.single{width:36cqw}\n#s6-v2 .result-cards.single .hero-card>b{font-size:4.4cqw}\n#s6-v2 .ticket-left{display:inline-flex;align-items:center;gap:1cqw;background:#0000007a;border:1px solid #ffffff3a;border-radius:5cqw;padding:.6cqw 3.4cqw;font-size:3.5cqw;margin-top:10cqw}\n#s6-v2 .ticket-left img{width:6.4cqw;height:6.4cqw}\n#s6-v2 .ticket-left b{color:#ffd54a;font-size:4.2cqw}\n#s6-v2 .results-screen .dialog-actions{padding-top:2cqw}\n#s6-v2 .ticket-chip{display:inline-flex;align-items:center;gap:.5cqw;background:#7a40161a;border-radius:3cqw;padding:0 2.2cqw;font-size:3.1cqw}\n#s6-v2 .ticket-chip img{width:4.8cqw;height:4.8cqw}\n/* hero page */\n#s6-v2 .hero-stage .stars{gap:1.4cqw}\n#s6-v2 .hero-stage .star-row{font-size:6.6cqw}\n#s6-v2 .v2-button.star-button{width:8cqw;height:8cqw;min-height:0;padding:.6cqw;border-radius:50%;border-image:none!important;background:radial-gradient(#fff6c4,#f7c443)!important;border:2px solid #d49326!important;margin-left:1.5cqw}\n#s6-v2 .star-button img{width:100%;height:100%}\n#s6-v2 .roles{display:flex;justify-content:center;align-items:center;gap:1cqw;font-size:3.4cqw}\n#s6-v2 .roles .ico{color:#c98b22}\n#s6-v2 .roles span{margin-left:2.4cqw;color:#86664a;font-size:3cqw}\n#s6-v2 .formation-link .ico{width:4cqw;height:4cqw}\n#s6-v2 .experience .exp-track{flex:1;height:2.8cqw}\n#s6-v2 .experience .exp-track i{background:linear-gradient(#ffe56f,#f0ad1a)}\n#s6-v2 .experience small{font-size:3.2cqw}\n#s6-v2 .page-actions button{min-height:10.5cqw;font-size:4.6cqw;min-width:38%}\n#s6-v2 .card-title{font-size:4.8cqw!important;margin:0 0 1.2cqw .6cqw!important}\n#s6-v2 .hero-skills{grid-template-columns:repeat(4,1fr) 1px 1fr;align-items:start;gap:1.2cqw}\n#s6-v2 .hero-skills .kind{background:#fbdcb0;border-radius:2cqw;padding:0 2cqw;font-size:2.7cqw}\n#s6-v2 .hero-skills img{width:14cqw;height:14cqw}\n#s6-v2 .hero-skills b{font-size:3.1cqw;white-space:nowrap}\n#s6-v2 .skill-divider{align-self:stretch;background:#e6c79c;margin:2cqw 0}\n#s6-v2 .tree-button img{width:15cqw!important;height:15cqw!important;margin-top:2.4cqw}\n#s6-v2 .attributes .stat-row{font-size:3.3cqw;min-height:6cqw;margin:.35cqw 0}\n#s6-v2 .party-tags{display:flex;gap:.8cqw;align-items:center}\n#s6-v2 .party-tags i{font-style:normal;background:#f6dfbd!important;border-radius:1.6cqw;padding:0 1.3cqw;font-size:2.5cqw;display:inline-flex;align-items:center;gap:.4cqw;color:#5d3216}\n#s6-v2 .party-tags .ico{width:3cqw;height:3cqw;color:#d18d1f}\n#s6-v2 .turn-arrow{color:#5d3216;font-size:3cqw}\n/* bag */\n#s6-v2 .part-tabs .ico{width:6.4cqw;height:6.4cqw;color:#6b4423}\n#s6-v2 .bag-footer{padding:1.4cqw 1.6cqw;font-size:3.9cqw}\n#s6-v2 .bag-footer>b{font-size:3.9cqw;white-space:nowrap}\n#s6-v2 .bag-footer .expand-button{font-size:3.7cqw;min-height:9cqw;padding:1cqw 3.4cqw;gap:1cqw;border-radius:6cqw}\n#s6-v2 .expand-button img{width:5.6cqw;height:5.6cqw}\n#s6-v2 .expand-button .ico{width:5.2cqw;height:5.2cqw;color:#7a4a26}\n#s6-v2 .bag-footer .salvage-button{font-size:4.8cqw;min-height:11cqw;min-width:35%;border-radius:6cqw}\n#s6-v2 .part-tabs.labeled{border-top:1px solid #ecd2a6;padding-top:1.6cqw;gap:.4cqw}\n#s6-v2 .part-tabs.labeled button{flex-direction:column;height:auto;min-height:13.5cqw;padding:.6cqw 0;border-radius:2.6cqw;gap:.2cqw}\n#s6-v2 .part-tabs.labeled img{width:7.4cqw;height:7.4cqw}\n#s6-v2 .part-tabs.labeled small{font-size:2.9cqw}\n/* rewards */\n#s6-v2 .reward{background:linear-gradient(135deg,#ffffff4d,transparent 55%),var(--quality,#48b7e5);border-radius:2cqw}\n#s6-v2 .reward>b{font-size:3.1cqw}\n#s6-v2 .reward-scroll{height:auto;min-height:19cqw;max-height:40cqw;background:#f6e5cc;border:1px solid #efd6b0;border-radius:2.6cqw;padding:2cqw}\n/* recruit */\n#s6-v2 .recruit-page{padding-top:2cqw}\n#s6-v2 .recruit-page>.wallet .resource{height:7.4cqw;font-size:3.9cqw;padding:0 3cqw 0 .3cqw}\n#s6-v2 .recruit-page>.wallet .resource img{height:8.4cqw;width:8.4cqw}\n#s6-v2 .recruit-page .menu{position:static;width:9.4cqw;height:9.4cqw;font-size:6cqw;padding:0}\n#s6-v2 .ticket-resource img{transform:rotate(-12deg)}\n#s6-v2 .recruit-page>.main-tabs{padding:0 5cqw}\n#s6-v2 .recruit-banner{align-self:flex-start;display:flex;flex-direction:column;align-items:center;margin:1.5cqw 0 0 1cqw;z-index:3}\n#s6-v2 .recruit-banner h1{display:flex;align-items:center;gap:.4cqw;font-size:9.4cqw;color:#fff8e2;-webkit-text-stroke:.5cqw #5b2c0e;paint-order:stroke fill;text-shadow:0 .8cqw #5b2c0e;letter-spacing:.3cqw}\n#s6-v2 .recruit-banner .laurel{width:7cqw;height:11cqw}\n#s6-v2 .ribbon{background:linear-gradient(#ad6d33,#7c4520);color:#ffe8b0;font-size:3.5cqw;padding:.6cqw 6cqw;clip-path:polygon(0 0,100% 0,95% 50%,100% 100%,0 100%,5% 50%);letter-spacing:.2cqw;margin:0}\n#s6-v2 .recruit-cast{position:relative;flex:1;min-height:30cqw;margin-top:-6cqw}\n#s6-v2 .recruit-cast .cast{position:absolute;object-fit:contain;filter:drop-shadow(0 1.5cqw 1.5cqw #0006)}\n#s6-v2 .c-front{width:58%;height:66%;left:21%;bottom:0;z-index:4}\n#s6-v2 .c-left{width:40%;height:46%;left:0;top:28%;z-index:2}\n#s6-v2 .c-right{width:40%;height:46%;right:0;top:24%;z-index:2}\n#s6-v2 .c-back{width:38%;height:42%;left:31%;top:8%;z-index:1}\n#s6-v2 .up-badge{position:absolute;right:13%;bottom:14%;z-index:5;background:linear-gradient(#a874ea,#6a39bf);color:#fff;border:2px solid #ffe08a;border-radius:3cqw;padding:.5cqw 2.6cqw;font-size:3.9cqw;display:flex;flex-direction:column;align-items:center;line-height:1.15;transform:rotate(-6deg);box-shadow:0 2px 4px #0005}\n#s6-v2 .up-badge b{background:#ffd23f;color:#6a39bf;border-radius:2cqw;padding:0 2.4cqw;font-size:3.4cqw}\n#s6-v2 .recruit-bottom{gap:2.2cqw;padding:1cqw 3cqw 1.4cqw}\n#s6-v2 .pity-panel{align-self:center;width:74%;display:flex;align-items:center;gap:2.6cqw;background:linear-gradient(#fff8ea,#ffe8c6);border:2px solid #e6c088;border-radius:6cqw;padding:1.4cqw 5cqw 1.4cqw 2cqw;color:#5d3216;box-shadow:0 2px 5px #0004}\n#s6-v2 .pity-panel .crown{width:11cqw;height:11cqw;flex-shrink:0;border-radius:50%;background:radial-gradient(#fff1b8,#f6c64f);display:flex;align-items:center;justify-content:center;color:#d6870a}\n#s6-v2 .pity-panel .crown .ico{width:7cqw;height:7cqw}\n#s6-v2 .pity-panel>div{flex:1;display:flex;flex-direction:column;align-items:center;gap:.6cqw;font-size:3.6cqw}\n#s6-v2 .pity-panel em{color:#d9412b;font-size:1.1em}\n#s6-v2 .pity-panel small{font-size:3.1cqw}\n#s6-v2 .pool-links{justify-content:space-between;padding:0 5cqw}\n#s6-v2 .pool-links button{font-size:3.5cqw;min-height:7.6cqw;gap:1.2cqw;padding:1cqw 3.4cqw}\n#s6-v2 .pool-links .ico{width:4.6cqw;height:4.6cqw}\n#s6-v2 .recruit-bottom .page-actions{gap:3cqw}\n#s6-v2 .recruit-bottom .page-actions button{min-width:45%;min-height:16cqw;flex-direction:column;gap:.2cqw}\n#s6-v2 .recruit-bottom .page-actions b,#s6-v2 .results-screen .dialog-actions b{font-size:5cqw}\n/* dungeon */\n#s6-v2 .dungeon-list{gap:2.4cqw}\n#s6-v2 .dungeon-card{grid-template-columns:44% 56%;border:1.5px solid #f3dab4;padding:1.5cqw;max-height:none;flex:1;min-height:0}\n#s6-v2 .dungeon-card>div{padding:.4cqw .6cqw .4cqw 3cqw;gap:1.2cqw}\n#s6-v2 .dungeon-card h2{text-align:left;font-size:5.2cqw}\n#s6-v2 .drop-icons{justify-content:flex-start;align-items:flex-start;flex:none;gap:1.4cqw}\n#s6-v2 .drop-icons>.reward{width:13cqw;max-height:none}\n#s6-v2 .dungeon-card footer{margin-top:auto}\n#s6-v2 .dungeon-card footer small{font-size:3.1cqw;display:inline-flex;align-items:center;gap:.4cqw}\n#s6-v2 .dungeon-card footer .ico,#s6-v2 .feature-row>b .ico,#s6-v2 .challenge-cost .ico{color:#4fb22a}\n#s6-v2 .dungeon-card footer button{font-size:4.8cqw;min-height:9.6cqw;padding:.5cqw 7cqw}\n#s6-v2 .resume-button{font-size:4cqw;min-height:9cqw}\n#s6-v2 .feature-card{flex:1;min-height:0;display:flex;flex-direction:column;background:#fff4e2;border:1.5px solid #f1d6ad;border-radius:3.6cqw;overflow:hidden;box-shadow:0 2px 3px #a86a3522}\n#s6-v2 .feature-art{position:relative;flex:1;min-height:36cqw;background-size:cover;background-position:center bottom}\n#s6-v2 .feature-title{position:absolute;top:2.4cqw;left:0;right:0;display:flex;flex-direction:column;align-items:center}\n#s6-v2 .title-row{display:flex;align-items:center;gap:.6cqw}\n#s6-v2 .feature-title h2{font-size:9.4cqw;color:#fff4cf;-webkit-text-stroke:.5cqw #6b3510;paint-order:stroke fill;text-shadow:0 .8cqw #6b3510;letter-spacing:.4cqw}\n#s6-v2 .feature-title .laurel{width:7cqw;height:11cqw}\n#s6-v2 .feature-title .ribbon{background:linear-gradient(#fff6de,#f3d9a4);color:#5d3216;font-size:3.8cqw;padding:.6cqw 7cqw;margin-top:-1cqw}\n#s6-v2 .help-button{position:absolute;right:2.4cqw;top:2.4cqw;width:8.4cqw;height:8.4cqw;background:#fff4dc!important;border-radius:50%;color:#6b3d1c;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px #0004!important}\n#s6-v2 .help-button .ico{width:7cqw;height:7cqw}\n#s6-v2 .feature-panel{display:flex;flex-direction:column;padding:.6cqw 3cqw 1.2cqw;background:#fff6e7}\n#s6-v2 .feature-row{display:flex;align-items:center;gap:2.4cqw;padding:1.6cqw 0;border-bottom:1px solid #efd7b2;font-size:3.9cqw;min-height:12cqw}\n#s6-v2 .feature-row:last-child{border-bottom:0}\n#s6-v2 .feature-row>b{white-space:nowrap;display:inline-flex;align-items:center;gap:.6cqw}\n#s6-v2 .feature-row>i{width:1px;align-self:stretch;background:#e5c697;margin:1cqw 0}\n#s6-v2 .feature-row small{font-size:3.1cqw;color:#7a5a3c}\n#s6-v2 .feature-row.record>.ico{width:10cqw;height:10cqw;color:#f0b323}\n#s6-v2 .feature-row.record strong{font-size:4.8cqw}\n#s6-v2 .feature-rewards{display:flex;gap:4.4cqw;flex:1;justify-content:center;align-items:flex-start}\n#s6-v2 .feature-rewards .reward{width:14.5cqw}\n#s6-v2 .feature-rewards>span{display:flex;flex-direction:column;align-items:center;gap:.3cqw}\n#s6-v2 .feature-rewards>span>small{font-size:2.7cqw}\n#s6-v2 .lineup{display:flex;align-items:center;gap:2.4cqw;flex:1;justify-content:flex-end}\n#s6-v2 .round-face{position:relative;display:block;width:14.5cqw;height:14.5cqw}\n#s6-v2 .round-face .disc{display:block;width:100%;height:100%;border-radius:50%;overflow:hidden;background:radial-gradient(#fff6db,#f6cf8a);border:2px solid #e2a84a}\n#s6-v2 .round-face .face{width:100%;height:100%;object-fit:cover;object-position:50% 0;transform:scale(1.55);transform-origin:50% 12%}\n#s6-v2 .round-face b{position:absolute;left:50%;bottom:-1.4cqw;transform:translateX(-50%);background:#6b3d1c;color:#fff;font-size:2.5cqw;border-radius:2cqw;padding:0 1.6cqw;white-space:nowrap}\n#s6-v2 .lineup>i{width:1px;align-self:stretch;background:#e5c697}\n#s6-v2 .lineup-button{flex-direction:column;min-height:13cqw;padding:1cqw 2.4cqw;gap:0}\n#s6-v2 .lineup-button .ico{width:6.4cqw;height:6.4cqw;color:#e3a21a}\n#s6-v2 .lineup-button small{font-size:3.2cqw}\n#s6-v2 .go-button{margin-left:auto;font-size:5.2cqw;min-height:11cqw;min-width:36%}\n#s6-v2 .daily-card header{display:flex;align-items:center;justify-content:center;gap:3cqw;padding:2.4cqw}\n#s6-v2 .daily-card header h2{font-size:6.6cqw}\n#s6-v2 .daily-card header>i{width:1px;height:7cqw;background:#e2c393}\n#s6-v2 .today{display:inline-flex;align-items:center;gap:1cqw;background:#ffe5b6;border-radius:4cqw;padding:.6cqw 2.6cqw;font-size:3.4cqw}\n#s6-v2 .today .ico{color:#e2492f;width:5cqw;height:5cqw}\n#s6-v2 .daily-card .feature-art{margin:0 2.4cqw;border-radius:3cqw;background-position:center}\n#s6-v2 .daily-card .feature-panel{margin:2cqw 2.4cqw 2.4cqw;border:1px solid #efd5ac;border-radius:3cqw}\n#s6-v2 .challenge-heading>img{width:38%;border:2px solid #f2d7ae}\n#s6-v2 .challenge-heading h3{font-size:5.2cqw}\n#s6-v2 .challenge-heading small{display:block;font-size:3.3cqw;margin-top:.8cqw}\n#s6-v2 .challenge-dialog .main-tabs button{min-height:9cqw;font-size:4.2cqw}\n#s6-v2 .challenge-cost{display:flex;align-items:center;gap:1cqw;font-size:3.3cqw;margin:0}\n#s6-v2 .challenge-dialog .dialog-actions button{min-height:9.5cqw;font-size:4.4cqw;min-width:40%}\n#s6-v2 .pool-name{display:block;text-align:center;align-self:center;background:#fbe1bb;border-radius:3cqw;padding:.6cqw 5cqw;font-size:4cqw}\n#s6-v2 .pool-name.lined{display:flex;align-items:center;gap:2cqw;background:none;font-size:4.1cqw}\n#s6-v2 .pool-name.lined:before,#s6-v2 .pool-name.lined:after{content:'';width:10cqw;height:1px;background:#e1bc80}\n#s6-v2 .result-line{text-align:center;font-size:3.6cqw}\n#s6-v2 .offline-rates{gap:3cqw}\n#s6-v2 .offline-rates .resource{font-size:3.9cqw;height:8.4cqw;padding:0 3.4cqw 0 .6cqw;background:#fbe1bc;border:0;box-shadow:none}\n#s6-v2 .offline-rates .resource img{width:8.4cqw;height:8.4cqw}\n#s6-v2 .idle-time{display:flex;align-items:center;justify-content:center;gap:2.6cqw;font-size:3.7cqw}\n#s6-v2 .idle-time span{display:inline-flex;align-items:center;gap:1.2cqw;background:linear-gradient(#ebf6cc,#d5ebaa);border-radius:4cqw;padding:.6cqw 3.4cqw;color:#3a5719}\n#s6-v2 .idle-time .ico{color:#5b3a1c;width:4.6cqw;height:4.6cqw}\n#s6-v2 .idle-time small{border-left:1px solid #d9b98b;padding-left:2.6cqw;font-size:3.3cqw;color:#86664a}\n/* salvage */\n#s6-v2 .label-line{font-size:3.9cqw;margin:.4cqw 1cqw 0}\n#s6-v2 .quality-checks{display:flex;flex-wrap:nowrap;justify-content:space-between;background:#f7e5cb;border-radius:2.6cqw;padding:1.6cqw 2.4cqw}\n#s6-v2 .check-option{display:inline-flex!important;align-items:center;gap:1cqw;font-size:3.7cqw}\n#s6-v2 .box{width:5.4cqw;height:5.4cqw;border:2px solid #9a6a3e;border-radius:1.2cqw;background:#fff;display:flex;align-items:center;justify-content:center;font-style:normal}\n#s6-v2 .box.on{background:#fff4cc;border-color:#c98622}\n#s6-v2 .box .ico{width:4.6cqw;height:4.6cqw;color:#7a4316}\n#s6-v2 .lock-note{display:flex;align-items:center;justify-content:center;gap:1.4cqw;background:#fbdfbf;border-radius:2.2cqw;padding:1.2cqw;font-size:3.3cqw}\n#s6-v2 .lock-note .ico{color:#d29a2b;width:4.4cqw;height:4.4cqw}\n#s6-v2 .list-heading{font-size:3.9cqw;padding:0 1cqw}\n#s6-v2 .list-heading em{color:#3d9a1f}\n#s6-v2 .checked{left:auto;right:2%;top:2%;bottom:auto;background:none;padding:0;line-height:0}\n#s6-v2 .checked .ico{width:6.4cqw;height:6.4cqw;color:#ffe04a;filter:drop-shadow(0 0 1px #7a4a0f) drop-shadow(0 1px 0 #7a4a0f)}\n#s6-v2 .salvage-scroll{height:60cqw;background:#fff8ee;border:1px solid #efd7b2;border-radius:2.6cqw;padding:1.6cqw}\n#s6-v2 .material-line{justify-content:space-between;padding:1cqw 2cqw;font-size:3.9cqw}\n#s6-v2 .material-line span{display:inline-flex;align-items:center;gap:1cqw;font-size:4.1cqw}\n#s6-v2 .material-line img{width:7.4cqw;height:7.4cqw}\n/* pools */\n#s6-v2 .pool-heroes{grid-template-columns:repeat(4,1fr);gap:2.6cqw;padding:0 1.6cqw}\n#s6-v2 .pool-heroes .portrait-tile{width:100%}\n#s6-v2 .rules{margin:0;padding:1.8cqw 2cqw 1.8cqw 7cqw;background:#fff8ec;border:1px solid #ecd2aa;border-radius:2.6cqw;font-size:3.4cqw;line-height:1.85}\n/* talents */\n#s6-v2 .talent-wallet{display:flex;align-items:center;justify-content:center;gap:2cqw;font-size:4.1cqw}\n#s6-v2 .talent-wallet .face{width:9.4cqw;height:9.4cqw;border-radius:50%;object-fit:cover;object-position:50% 0;background:#fde4bd}\n#s6-v2 .talent-wallet>i{width:1px;height:5.4cqw;background:#d9b98b}\n#s6-v2 .talent-wallet em{font-size:5.2cqw}\n#s6-v2 .talent-tree{height:90cqw;min-height:0;flex-shrink:0;background:radial-gradient(ellipse at 50% 55%,#fff7df,transparent 72%)}\n#s6-v2 .talent-tree .trunk{stroke:#a8692f;stroke-width:9px;fill:none;stroke-linecap:round;vector-effect:non-scaling-stroke}\n#s6-v2 .talent-tree .branch{stroke:#b57a3d;stroke-width:5px;fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}\n#s6-v2 .talent-tree .leaves ellipse{fill:#86c443;stroke:#4f7e22;stroke-width:1px;vector-effect:non-scaling-stroke}\n#s6-v2 .v2-button.talent-node{width:12.5cqw;height:12.5cqw;border-radius:50%;border-image:none!important;background:radial-gradient(circle at 50% 32%,#ffffff,#dcd7ce 55%,#aaa397)!important;border:3px solid #f4e7d0!important;box-shadow:0 0 0 2px #bba585,0 2px 3px #0003!important;color:#8f8a82;font-size:inherit}\n#s6-v2 .talent-tree>button:nth-of-type(-n+5){width:14.5cqw;height:14.5cqw}\n#s6-v2 .talent-node .ico{width:55%;height:55%}\n#s6-v2 .talent-node.ready{color:#6f5b45}\n#s6-v2 .talent-node.learned{background:radial-gradient(circle at 50% 32%,#fff8bd,#ffc72d 55%,#e2890b)!important;color:#fff;box-shadow:0 0 0 2px #c9831a,0 0 9px #ffd34a!important}\n#s6-v2 .talent-node.learned .ico{filter:drop-shadow(0 1px 0 #a35a06)}\n#s6-v2 .talent-node.current{box-shadow:0 0 0 3px #62d036,0 0 12px 4px #8cf05a!important}\n#s6-v2 .talent-node b{position:absolute;bottom:-2.2cqw;left:50%;transform:translateX(-50%);background:#6b3d1c;color:#fff;font-size:2.5cqw;border-radius:2cqw;padding:0 1.4cqw;line-height:1.5}\n#s6-v2 .talent-info{display:flex;align-items:center;gap:3cqw;background:#fff8ec;border:1px solid #edd3ab;border-radius:3cqw;padding:2.2cqw 3.4cqw}\n#s6-v2 .talent-info>div{flex:1;display:flex;flex-direction:column;gap:.6cqw}\n#s6-v2 .talent-info h3{font-size:4.6cqw}\n#s6-v2 .talent-info p{font-size:3.3cqw;color:#7a5a3c}\n#s6-v2 .talent-info>i{width:1px;align-self:stretch;background:#e2c393}\n#s6-v2 .talent-info>b{font-size:3.9cqw;white-space:nowrap}\n#s6-v2 .talent-info em{font-size:5cqw}\n/* formation */\n#s6-v2 .formation-scene{height:42%;flex-shrink:0}\n#s6-v2 .title-plaque.plaque{display:flex;width:max-content;margin:2.6cqw auto 0!important;font-size:inherit}\n#s6-v2 .title-plaque .plate{font-size:5.6cqw;padding:1.6cqw 7cqw;letter-spacing:.6cqw}\n#s6-v2 .standing-heroes{position:absolute;inset:15cqw 2% 3cqw;display:block}\n#s6-v2 .standing-heroes .v2-button.standing{position:absolute;transform:translate(-50%,-50%);width:30%;display:flex;flex-direction:column;align-items:center;gap:0;border-image:none!important;background:none!important;border:0;padding:0;min-height:0;isolation:isolate}\n#s6-v2 .standing .face{width:100%;height:17cqw;object-fit:contain;filter:drop-shadow(0 1cqw 0 #00000022)}\n#s6-v2 .standing.front .face{height:21cqw}\n#s6-v2 .standing:before{content:'';position:absolute;bottom:3.6cqw;width:78%;height:5cqw;border-radius:50%;background:radial-gradient(#fff4b8ee,#ffd76a77 55%,transparent 72%);z-index:-1}\n#s6-v2 .role-tag{display:inline-flex;align-items:center;gap:.8cqw;background:#fff6e4ee;border-radius:3cqw;padding:.3cqw 2cqw .3cqw .4cqw;font-size:2.8cqw;white-space:nowrap;box-shadow:0 1px 2px #0002;margin-bottom:.4cqw}\n#s6-v2 .role-tag .role-badge{position:static;width:4.8cqw;height:4.8cqw;border-width:1px}\n#s6-v2 .role-tag .role-badge .ico{width:3cqw;height:3cqw}\n#s6-v2 .row-plaque{margin-top:-1.6cqw;background:linear-gradient(#fff5dc,#ffd98e);border:1.5px solid #d9a24c;border-radius:1.6cqw;padding:0 3.4cqw;font-size:3cqw;line-height:1.5}\n#s6-v2 .standing small{background:none;font-size:3.2cqw;color:#4d2a12;text-shadow:0 0 2px #fff,0 0 3px #fff;padding:0;margin-top:.3cqw}\n#s6-v2 .standing-heroes .empty-position{position:absolute;transform:translate(-50%,-50%);width:15cqw;height:15cqw;min-height:0;border-radius:50%}\n#s6-v2 .formation-sheet{flex:1;min-height:0;display:flex;flex-direction:column;background:#fff4e2;border-radius:4.6cqw 4.6cqw 0 0;margin-top:-4cqw;position:relative;box-shadow:0 -2px 5px #a8692f2a}\n#s6-v2 .formation-toolbar{padding:2.6cqw 3cqw;gap:1.6cqw;font-size:3.7cqw;border-bottom:1px solid #efd7b2;justify-content:flex-start}\n#s6-v2 .formation-toolbar>i{width:1px;height:6.4cqw;background:#e2c393}\n#s6-v2 .preset-buttons{display:flex;gap:1.4cqw}\n#s6-v2 .preset-buttons .v2-button{width:8.4cqw;height:8.4cqw;min-height:0;padding:0;border-radius:50%;font-size:4.2cqw;border-image:none!important;background:linear-gradient(#fff7e8,#ffe2bb)!important;border:1.5px solid #e2b77a!important}\n#s6-v2 .preset-buttons .v2-button.selected{background:linear-gradient(#ffe86a,#ffbe14)!important;border-color:#d99a1c!important}\n#s6-v2 .formation-name{margin-left:auto;font-size:3.5cqw}\n#s6-v2 .formation-toolbar>button{font-size:3.7cqw;min-height:8.6cqw;padding:1cqw 3.4cqw;gap:1cqw}\n#s6-v2 .formation-toolbar>button .ico{width:4.6cqw;height:4.6cqw}\n#s6-v2 .roster-grid{gap:2.6cqw;padding:3cqw}\n#s6-v2 .secondary-close{min-height:12cqw;font-size:5.4cqw;width:48%}\n#s6-v2 .formation-types{gap:2.6cqw}\n#s6-v2 .v2-button.formation-option{display:flex;flex-direction:column;align-items:stretch;background:#fff8ec;border:2px solid #efd5ab;border-radius:3cqw;padding:1.6cqw;gap:.6cqw;text-align:left}\n#s6-v2 .v2-button.formation-option.picked{border-color:#f0b323;box-shadow:0 0 0 1px #f8cf5c,inset 0 0 14px #ffe39a;background:#fffbea}\n#s6-v2 .formation-option header{display:flex;align-items:center;gap:1cqw}\n#s6-v2 .formation-option header>.ico{width:6cqw;height:6cqw;background:#a56a2f;color:#fff;border-radius:50%;padding:.9cqw}\n#s6-v2 .formation-option h3{font-size:3.9cqw}\n#s6-v2 .formation-option header small{margin-left:auto;font-size:2.5cqw;color:#7a5a3c;white-space:nowrap}\n#s6-v2 .radio{width:5.2cqw;height:5.2cqw;border-radius:50%;border:1.5px solid #b08a5c;background:#fff;display:flex;align-items:center;justify-content:center;font-style:normal;flex-shrink:0}\n#s6-v2 .radio.on{background:#f5b621;border-color:#d58d14}\n#s6-v2 .radio .ico{width:3.8cqw;height:3.8cqw;color:#fff}\n#s6-v2 .formation-mini{position:relative;height:38cqw;display:block}\n#s6-v2 .formation-mini>div{position:absolute;transform:translate(-50%,-50%);width:auto;display:flex;flex-direction:column;align-items:center}\n#s6-v2 .formation-mini .face{width:13.5cqw;height:13.5cqw;object-fit:contain}\n#s6-v2 .formation-mini b{font-size:2.6cqw;white-space:nowrap;background:radial-gradient(#ffe7a0,#ffe7a000 72%);padding:0 1.4cqw;margin-top:-1cqw}\n#s6-v2 .formation-note{display:flex;justify-content:center;align-items:center;gap:1.6cqw;background:#fbe5c6;border-radius:3cqw;padding:1.2cqw;font-size:3.3cqw}\n#s6-v2 .formation-note .ico{color:#b98a4a}\n/* upgrade page */\n#s6-v2 .forge-scene{height:44%}\n#s6-v2 .forge-scene>.title-plaque{position:absolute;left:50%;top:0;transform:translateX(-50%);margin:2.6cqw 0 0!important}\n#s6-v2 .forge-item{top:20cqw;left:3cqw;gap:2cqw}\n#s6-v2 .forge-item>.gear-tile{width:18cqw;border:2px solid #fff3cf;box-shadow:0 2px 3px #0003}\n#s6-v2 .forge-item>div{display:flex;flex-direction:column;gap:.8cqw}\n#s6-v2 .forge-item h2{font-size:4.6cqw;color:#fff;-webkit-text-stroke:.35cqw #5d3216;paint-order:stroke fill}\n#s6-v2 .upgrade-body{background:#fff4e2;border-radius:5cqw 5cqw 0 0;margin-top:-4cqw;position:relative;padding:2cqw 5cqw 1cqw;z-index:1;box-shadow:0 -2px 5px #6b3d1c26}\n#s6-v2 .level-preview{font-size:7.6cqw;padding:1cqw 0 1.4cqw;display:flex;justify-content:center;align-items:center;gap:3cqw}\n#s6-v2 .level-preview i{font-style:normal;font-size:6cqw}\n#s6-v2 .upgrade-body .stat-row{font-size:4.1cqw;min-height:7.6cqw;padding:1cqw 4cqw;margin:.5cqw 0}\n#s6-v2 .upgrade-body .stat-row .ico{width:5.2cqw;height:5.2cqw}\n#s6-v2 .upgrade-costs{justify-content:space-between;padding:2.4cqw 2cqw 0;gap:3cqw}\n#s6-v2 .upgrade-costs>div{gap:.8cqw}\n#s6-v2 .cost-icon{width:13.5cqw;height:13.5cqw;background:linear-gradient(#fffaf0,#f5e0c0);border:1.5px solid #d9b385;border-radius:2.6cqw;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 2px #0002}\n#s6-v2 .cost-icon img{width:82%;height:82%}\n#s6-v2 .upgrade-costs b{font-size:3.8cqw}\n#s6-v2 .upgrade-costs em{color:#3d9a1f}\n#s6-v2 .upgrade-costs button{min-width:40%;min-height:12.5cqw;font-size:5.6cqw}\n#s6-v2 .breakthrough-note{font-size:3.3cqw;margin-top:1.4cqw}\n@media(max-height:700px){#s6-v2 .talent-tree{height:72cqw}#s6-v2 .recruit-bottom .page-actions button{min-height:13cqw}#s6-v2 .feature-row{min-height:10cqw;padding:1cqw 0}}\n#s6-v2 .talent-node .ico{position:static;inset:auto;width:55%;height:55%;overflow:visible}\n#s6-v2 .talent-node .ico path{fill:currentColor;stroke:none}\n#s6-v2 .v2-button.talent-node{background:radial-gradient(circle at 50% 30%,#f8f6f2,#d3cdc3 58%,#a2998b)!important;padding:0}\n#s6-v2 .talent-node.ready{color:#6b5a48}\n#s6-v2 .formation-option h3{white-space:nowrap}\n#s6-v2 .formation-mini .face{width:15.5cqw;height:15.5cqw}\n#s6-v2 .formation-mini b{font-size:2.8cqw}\n#s6-v2 .v2-scrim.warm{background:radial-gradient(ellipse at 50% 40%,#3b2a14d9,#120b05f2 75%)}\n#s6-v2 .rewards-fullscreen .celebrate h2{font-size:12.5cqw}\n#s6-v2 .rewards-fullscreen .laurel{width:11cqw;height:17cqw}\n#s6-v2 .hero-card .portrait .face{object-fit:cover;object-position:50% 18%;transform:scale(1.12);transform-origin:50% 30%}\n#s6-v2 .standing .face{height:21cqw}\n#s6-v2 .standing.front .face{height:26cqw}\n#s6-v2 .standing-heroes{inset:13cqw 2% 2cqw}\n#s6-v2 .formation-toolbar{gap:1.2cqw;font-size:3.4cqw;padding:2.4cqw 2.4cqw}\n#s6-v2 .formation-toolbar>b,#s6-v2 .formation-name{white-space:nowrap}\n#s6-v2 .formation-toolbar>button{font-size:3.4cqw;padding:1cqw 2.6cqw}\n#s6-v2 .preset-buttons .v2-button{width:7.6cqw;height:7.6cqw}\n#s6-v2 .feature-row small{white-space:nowrap}\n#s6-v2 .feature-row{gap:2cqw}\n#s6-v2 .ico path{fill-rule:evenodd}\n#s6-v2 .rules{text-align:left}\n#s6-v2 .card-title{text-align:left;align-self:flex-start}\n#s6-v2 .roles span{white-space:nowrap}\n#s6-v2 .party-tags i{white-space:nowrap;padding:0 1cqw}\n#s6-v2 .party-tags{gap:.5cqw}\n");
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SecondEditionUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SecondEditionStyles.ts', './SquadBattleModel.ts', './V2Progress.ts'], function (exports) {
  var _createClass, cclegacy, SECOND_EDITION_STYLES, QUALITY_NAMES, EQUIPMENT_PARTS, DUNGEONS, SKILL_NAMES, SKILL_LEVELS, HERO_CONFIG, upgradeCost, gearPrimary, gearStats, GEAR_ATTRIBUTE_NAMES, gearName, gearUpgradePreview, RECRUIT_CONFIG, DIFFICULTIES, dungeonReward, TREE_NODES, FORMATIONS;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      SECOND_EDITION_STYLES = module.SECOND_EDITION_STYLES;
    }, function (module) {
      QUALITY_NAMES = module.QUALITY_NAMES;
      EQUIPMENT_PARTS = module.EQUIPMENT_PARTS;
      DUNGEONS = module.DUNGEONS;
      SKILL_NAMES = module.SKILL_NAMES;
      SKILL_LEVELS = module.SKILL_LEVELS;
      HERO_CONFIG = module.HERO_CONFIG;
      upgradeCost = module.upgradeCost;
      gearPrimary = module.gearPrimary;
      gearStats = module.gearStats;
      GEAR_ATTRIBUTE_NAMES = module.GEAR_ATTRIBUTE_NAMES;
      gearName = module.gearName;
      gearUpgradePreview = module.gearUpgradePreview;
      RECRUIT_CONFIG = module.RECRUIT_CONFIG;
      DIFFICULTIES = module.DIFFICULTIES;
      dungeonReward = module.dungeonReward;
    }, function (module) {
      TREE_NODES = module.TREE_NODES;
      FORMATIONS = module.FORMATIONS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bd589rD3sdLXbzpoyTs4aNl", "SecondEditionUI", undefined);
      var NAMES = ['莱恩', '艾琳', '莉亚', '罗宾'],
        ROLES = ['坦克', '输出', '治疗', '输出'];
      var Q = ['#b8afa2', '#83c632', '#39afe7', '#b36add', '#ffc631'];
      var QUALITY_TEXT = ['#7d6b5c', '#488c1a', '#1479b8', '#8e34ba', '#c47a00'];
      var esc = function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
          return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
          }[c];
        });
      };
      /** Small single-colour vector glyphs used for labels, rows and badges (game art stays in atlases). */
      var ICONS = {
        heart: 'M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2.1 0 3.5 1.2 5.4 3.2 1.9-2 3.3-3.2 5.4-3.2 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21z',
        sword: 'M21 2.6 21.4 3l-.4 4.2L11.6 16.6 7.4 12.4 16.8 3zM6.3 13.5l4.2 4.2-1.4 1.4-1.4-1.4-2.6 2.6.4 1.2-1.6 1-2.4-2.4 1-1.6 1.2.4 2.6-2.6-1.4-1.4z',
        shield: 'M12 2 20 5v6c0 5.2-3.4 9.4-8 11-4.6-1.6-8-5.8-8-11V5z',
        speed: 'M4 12h9l-4-5h3.5l5.5 5-5.5 5H9l4-5H4zM1 8h5v2H1zm0 6h5v2H1z',
        star: 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z',
        sparkle: 'M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z',
        clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5h-2v6.2l5 3 1-1.7-4-2.3z',
        leaf: 'M11 21v-7.5C11 9.4 8.2 6.5 2.5 6.5c0 5 2.9 7.9 8 7.9zm2 0v-4.6h.6c4.7 0 7.6-2.8 7.6-7.6-5.4 0-8.2 2.8-8.2 6.9z',
        crown: 'M3 18h18l-1.6-10.5-4.6 4.2L12 5l-2.8 6.7-4.6-4.2zM3 19.5h18V22H3z',
        bolt: 'M13.5 2 4 14h6.5L9.5 22 20 9.5h-6.6z',
        lock: 'M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1zm2 0h6V7a3 3 0 0 0-6 0z',
        fire: 'M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6.2 0 2.2 1 3.2 2 3.2 0-3-1-6 1-9z',
        check: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
        refresh: 'M17.7 6.3A8 8 0 1 0 20 12h-2a6 6 0 1 1-1.8-4.2L13 11h7V4z',
        warn: 'M12 2 1 21h22zm-1 7h2v6h-2zm0 8h2v2h-2z',
        list: 'M3 4h3v3H3zm5 .5h13v2H8zM3 10.5h3v3H3zm5 .5h13v2H8zM3 17h3v3H3zm5 .5h13v2H8z',
        book: 'M4 4.5C6.5 3.5 9.5 3.5 11 5v15c-1.5-1.5-4.5-1.5-7-.5zm16 0c-2.5-1-5.5-1-7 .5v15c1.5-1.5 4.5-1.5 7-.5z',
        trophy: 'M7 3h10v2h3.5v3A4.5 4.5 0 0 1 16.6 12.5 5 5 0 0 1 13 15.9V18h3.5v3h-9v-3H11v-2.1a5 5 0 0 1-3.6-3.4A4.5 4.5 0 0 1 3.5 8V5H7zm0 4H5.5v1A2.5 2.5 0 0 0 7 10.3zm10 0v3.3A2.5 2.5 0 0 0 18.5 8V7z',
        people: 'M12 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM5 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm14 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM12 11c3 0 5 2 5 5v2H7v-2c0-3 2-5 5-5zm-7 2.5c.9 0 1.6.2 2.1.5-.7 1-1.1 2.2-1.1 3.5H1V17c0-1.9 1.8-3.5 4-3.5zm14 0c2.2 0 4 1.6 4 3.5v.5h-5c0-1.3-.4-2.5-1.1-3.5.5-.3 1.2-.5 2.1-.5z',
        calendar: 'M7 2h2v2h6V2h2v2h3.5v17h-17V4H7zM5.5 9.5V19h13V9.5zM8 12h3v3H8z',
        cross: 'M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5z',
        swirl: 'M12 3a9 9 0 1 0 9 9h-2.5A6.5 6.5 0 1 1 12 5.5a4 4 0 1 1-4 4H5.5A6.5 6.5 0 1 0 12 3z',
        arrow: 'M3 19.6 13.6 9 11 8.2 20.6 3.4 15.8 13l-.8-2.6L4.4 21z',
        filter: 'M3 4h18l-7 8.5V19l-4 2v-8.5z',
        plus: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 5h2.4v3.8H17v2.4h-3.8V17h-2.4v-3.8H7v-2.4h3.8z',
        grid: 'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z',
        question: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.3 15h2.5v2.4h-2.5zm1.4-12c2.6 0 4.4 1.5 4.4 3.8 0 2.8-3.2 3.1-3.2 5.6h-2.5c0-3.4 3.1-3.6 3.1-5.5 0-1-.8-1.7-1.9-1.7s-1.9.7-2 1.9H7.6C7.8 6.6 9.5 5 12.1 5z'
      };
      var ico = function ico(name, cls) {
        if (cls === void 0) {
          cls = '';
        }
        return "<svg class=\"ico " + cls + "\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"" + ICONS[name] + "\"/></svg>";
      };
      var LAUREL = "<svg class=\"laurel\" viewBox=\"0 0 40 64\" aria-hidden=\"true\"><path d=\"M31 61C11 52 5 31 15 5\" fill=\"none\" stroke=\"#a8620f\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>" + [[19, 53, -55], [12, 44, -35], [8.5, 34, -15], [8.5, 24, 5], [11, 14.5, 25], [16, 6.5, 45]].map(function (_ref) {
        var x = _ref[0],
          y = _ref[1],
          r = _ref[2];
        return "<ellipse cx=\"" + x + "\" cy=\"" + y + "\" rx=\"7\" ry=\"3.4\" transform=\"rotate(" + r + " " + x + " " + y + ")\"/>";
      }).join('') + [[22, 46, 30], [16, 37, 15], [14, 27, 0], [16, 18, -15]].map(function (_ref2) {
        var x = _ref2[0],
          y = _ref2[1],
          r = _ref2[2];
        return "<ellipse cx=\"" + x + "\" cy=\"" + y + "\" rx=\"5.5\" ry=\"2.8\" transform=\"rotate(" + r + " " + x + " " + y + ")\"/>";
      }).join('') + "</svg>";
      var ROLE_ICONS = ['sword', 'swirl', 'cross', 'arrow'];

      /** Browser presentation over the shared Cocos battlefield. All actions use model transactions. */
      var SecondEditionUI = exports('SecondEditionUI', /*#__PURE__*/function () {
        function SecondEditionUI(port, textures) {
          var _this = this;
          this.root = void 0;
          this.backdrop = void 0;
          this.modal = void 0;
          this.content = void 0;
          this.actions = new Map();
          this.serial = 0;
          this.selected = 0;
          this.pool = 0;
          this.category = 0;
          this.part = -1;
          this.quality = -1;
          this.reverse = false;
          this.dungeonTab = 0;
          this.difficulty = 0;
          this.page = 'adventure';
          this.inSecondary = false;
          this.urls = {};
          this.lastReceipt = '';
          this.lastOffline = null;
          this.toastTimer = void 0;
          this.lastUpdate = 0;
          this.onKey = function (e) {
            if (e.key === 'Escape') {
              var _this$root$querySelec;
              if (_this.modal.childElementCount) _this.close();else if (_this.inSecondary) (_this$root$querySelec = _this.root.querySelector('.secondary-close')) == null || _this$root$querySelec.click();
            }
          };
          this.port = port;
          for (var _i = 0, _Object$keys = Object.keys(textures); _i < _Object$keys.length; _i++) {
            var name = _Object$keys[_i];
            this.urls[name] = this.source(textures[name]);
          }
          this.prepareAtlas(textures);
          var style = document.createElement('style');
          style.id = 'second-edition-style';
          style.textContent = SECOND_EDITION_STYLES;
          document.head.appendChild(style);
          this.backdrop = document.createElement('div');
          this.backdrop.id = 's6-backdrop';
          document.body.appendChild(this.backdrop);
          this.root = document.createElement('div');
          this.root.id = 's6-v2';
          this.root.setAttribute('aria-label', '森林挂机冒险');
          this.root.innerHTML = '<main class="v2-content"></main><div class="v2-modal-host"></div><div class="v2-toast" role="status"></div>';
          for (var _i2 = 0, _arr = [['gold', this.urls.control0], ['cream', this.urls.control1], ['panel', this.urls.control2], ['plaque', this.urls.control3], ['close', this.urls.roundClose || this.urls.control4], ['peach', this.urls.peach || this.urls.control1]]; _i2 < _arr.length; _i2++) {
            var _arr$_i = _arr[_i2],
              key = _arr$_i[0],
              value = _arr$_i[1];
            this.root.style.setProperty('--' + key + '-art', "url(\"" + value + "\")");
          }
          document.body.appendChild(this.root);
          this.content = this.root.querySelector('main');
          this.modal = this.root.querySelector('.v2-modal-host');
          this.root.addEventListener('click', function (e) {
            var b = e.target.closest('[data-action]');
            if (b && !b.hasAttribute('disabled')) {
              var _this$actions$get;
              e.stopPropagation();
              (_this$actions$get = _this.actions.get(b.dataset.action)) == null || _this$actions$get();
              _this.pruneActions();
            }
          });
          document.addEventListener('keydown', this.onKey);
          this.draw();
          window.dispatchEvent(new Event('resize'));
        }
        var _proto = SecondEditionUI.prototype;
        _proto.source = function source(t) {
          var _i$nativeAsset, _i$data;
          var i = t.image;
          return (i == null || (_i$nativeAsset = i.nativeAsset) == null ? void 0 : _i$nativeAsset.src) || (i == null || (_i$data = i.data) == null ? void 0 : _i$data.src) || (i == null ? void 0 : i.nativeUrl) || '';
        };
        _proto.crop = function crop(t, x, y, w, h) {
          var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          var img = t.image.data;
          ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
          return canvas.toDataURL('image/png');
        };
        _proto.prepareAtlas = function prepareAtlas(t) {
          var _this2 = this;
          var bg = t['v2-backgrounds'];
          for (var i = 0; i < 6; i++) this.urls['scene' + i] = this.crop(bg, i % 2 * bg.width / 2, Math.floor(i / 2) * bg.height / 3, bg.width / 2, bg.height / 3);
          var monsters = t['monsters-4'];
          for (var _i3 = 0; _i3 < 4; _i3++) this.urls['monster' + _i3] = this.crop(monsters, _i3 % 2 * monsters.width / 2, Math.floor(_i3 / 2) * monsters.height / 2, monsters.width / 2, monsters.height / 2);
          var icons = t['v2-icons'];
          for (var _i4 = 0; _i4 < 9; _i4++) this.urls['icon' + _i4] = this.crop(icons, _i4 % 3 * icons.width / 3, Math.floor(_i4 / 3) * icons.height / 3, icons.width / 3, icons.height / 3);
          var nav = t['v2-navigation'];
          for (var _i5 = 0; _i5 < 9; _i5++) this.urls['nav' + _i5] = this.crop(nav, _i5 % 3 * nav.width / 3, Math.floor(_i5 / 3) * nav.height / 3, nav.width / 3, nav.height / 3);
          var d = t['dungeon-ui-v2'];
          for (var _i6 = 0; _i6 < 4; _i6++) this.urls['dungeon' + _i6] = this.crop(d, 38, [280, 590, 898, 1190][_i6], 390, 260);
          var c = t['v2-controls'];
          var boxes = [[28, 90, 579, 203], [646, 90, 590, 203], [50, 365, 535, 455], [637, 510, 605, 180], [162, 889, 285, 290], [572, 948, 674, 180]];
          boxes.forEach(function (r, i) {
            return _this2.urls['control' + i] = _this2.crop(c, r[0], r[1], r[2], r[3]);
          });
          var skills = t['v2-skills'];
          for (var _i7 = 0; _i7 < 9; _i7++) this.urls['ability' + _i7] = this.crop(skills, _i7 % 3 * skills.width / 3, Math.floor(_i7 / 3) * skills.height / 3, skills.width / 3, skills.height / 3);
          this.urls.tree = this.urls.ability6;
          this.urls.material = this.urls.ability7;
          this.urls.ticket = this.urls.ability8;
          // Peach secondary button, round close, padlocks and star from the shared modal control sheet.
          var m = t['modal-controls-9'];
          if (m) {
            var r = [['peach', [452, 155, 349, 143]], ['roundClose', [84, 496, 262, 267]], ['lock', [910, 494, 236, 262]], ['unlock', [103, 883, 236, 276]], ['starIcon', [494, 904, 260, 252]]];
            r.forEach(function (_ref3) {
              var k = _ref3[0],
                b = _ref3[1];
              return _this2.urls[k] = _this2.crop(m, b[0], b[1], b[2], b[3]);
            });
          }
          // Endless tower and daily mushroom illustrations (text-free crops of the approved concepts).
          var f = t['v2-feature-scenes'];
          if (f) {
            this.urls.endlessArt = this.crop(f, 0, 0, f.width, f.height / 2);
            this.urls.dailyArt = this.crop(f, 0, f.height / 2, f.width, f.height / 2);
          }
        };
        _proto.pruneActions = function pruneActions() {
          var _this3 = this;
          var active = new Set(Array.from(this.root.querySelectorAll('[data-action]')).map(function (n) {
            return n.dataset.action;
          }));
          this.actions.forEach(function (_, id) {
            if (!active.has(id)) _this3.actions["delete"](id);
          });
        };
        _proto.img = function img(name, cls, alt) {
          if (cls === void 0) {
            cls = '';
          }
          if (alt === void 0) {
            alt = '';
          }
          return "<img class=\"" + cls + "\" src=\"" + (this.urls[name] || '') + "\" alt=\"" + esc(alt) + "\" draggable=\"false\">";
        };
        _proto.button = function button(text, fn, cls, disabled, label) {
          if (cls === void 0) {
            cls = '';
          }
          if (disabled === void 0) {
            disabled = false;
          }
          if (label === void 0) {
            label = '';
          }
          var id = String(++this.serial);
          this.actions.set(id, fn);
          return "<button type=\"button\" data-action=\"" + id + "\" class=\"v2-button " + cls + "\" " + (disabled ? 'disabled' : '') + " " + (label ? "aria-label=\"" + esc(label) + "\"" : '') + ">" + text + "</button>";
        };
        _proto.face = function face(id, cls) {
          if (cls === void 0) {
            cls = '';
          }
          return this.img(['hero-knight', 'hero-mage', 'hero-priest', 'hero-archer'][id], 'face ' + cls, NAMES[id]);
        };
        _proto.resource = function resource(icon, value) {
          return "<span class=\"resource\">" + this.img('icon' + icon) + "<b>" + esc(value) + "</b></span>";
        };
        _proto.wallet = function wallet(stamina) {
          if (stamina === void 0) {
            stamina = true;
          }
          var b = this.port.model();
          return "<header class=\"wallet\">" + this.resource(6, b.gold) + (stamina ? this.resource(8, b.dungeon.stamina + '/120') : '') + "</header>";
        };
        _proto.nav = function nav(selected) {
          var _this4 = this;
          return "<nav class=\"v2-nav\" aria-label=\"\u4E3B\u5BFC\u822A\">" + ['hero', 'recruit', 'adventure', 'bag', 'dungeon'].map(function (p, i) {
            return _this4.button(_this4.img('nav' + i) + ("<b>" + ['英雄', '招募', '冒险', '背包', '副本'][i] + "</b>"), function () {
              return _this4.go(p);
            }, selected === p ? 'selected' : 'quiet');
          }).join('') + "</nav>";
        };
        _proto.setPage = function setPage(p) {
          this.page = p;
          this.draw();
        };
        _proto.go = function go(p) {
          this.close();
          this.page = p;
          this.port.navigate(p);
          this.draw();
        };
        _proto.run = function run(fn, next) {
          var error = this.port.mutate(fn);
          if (error) {
            this.toast(error);
            return false;
          }
          next == null || next();
          return true;
        };
        _proto.toast = function toast(text) {
          var n = this.root.querySelector('.v2-toast');
          n.textContent = text;
          n.classList.add('visible');
          clearTimeout(this.toastTimer);
          this.toastTimer = setTimeout(function () {
            return n.classList.remove('visible');
          }, 2600);
        };
        _proto.close = function close() {
          this.modal.innerHTML = '';
        };
        _proto.plate = function plate(title) {
          return "<span class=\"plate\"><i>\u2726</i><span>" + esc(title) + "</span><i>\u2726</i></span>";
        };
        _proto.hint = function hint() {
          return "<p class=\"outside-hint\">" + ico('leaf') + "\u70B9\u51FB\u7A7A\u767D\u5904\u5173\u95ED" + ico('leaf', 'mirror') + "</p>";
        };
        _proto.popup = function popup(title, body, actions, size) {
          var _this5 = this,
            _this$modal$querySele;
          if (actions === void 0) {
            actions = '';
          }
          if (size === void 0) {
            size = 'medium';
          }
          var oldFocus = document.activeElement;
          var full = size.indexOf('fullscreen') >= 0;
          var head = full ? "<header class=\"dialog-head celebrate\">" + LAUREL + "<h2>" + esc(title) + "</h2>" + LAUREL.replace('class="laurel"', 'class="laurel mirror"') + "</header>" : "<header class=\"dialog-head\"><h2 class=\"plaque\">" + this.plate(title) + "</h2>" + this.button('×', function () {
            _this5.close();
            oldFocus == null || oldFocus.focus();
          }, 'close', false, "\u5173\u95ED" + title) + "</header>";
          this.modal.innerHTML = "<div class=\"v2-scrim " + (full ? size.indexOf('rewards') >= 0 ? 'dark warm' : 'dark' : '') + "\"><section class=\"v2-dialog " + size + "\" role=\"dialog\" tabindex=\"-1\" aria-modal=\"true\" aria-label=\"" + esc(title) + "\">" + head + "<div class=\"dialog-body\">" + body + "</div>" + (actions ? '<footer class="dialog-actions">' + actions + '</footer>' : '') + "</section>" + this.hint() + "</div>";
          var shade = this.modal.firstElementChild;
          shade.addEventListener('click', function (e) {
            if (e.target === shade || e.target.closest('.outside-hint')) _this5.close();
          });
          (_this$modal$querySele = this.modal.querySelector('[role=dialog]')) == null || _this$modal$querySele.focus();
        };
        _proto.info = function info(title, text, confirm) {
          this.confirm(title, esc(text), confirm);
        };
        _proto.confirm = function confirm(title, html, _confirm) {
          var _this6 = this;
          this.popup(title, "<div class=\"info-pad\">" + html + "</div>", _confirm ? this.button('取消', function () {
            return _this6.close();
          }, 'peach') + this.button('确定', function () {
            _this6.close();
            _confirm();
          }) : '', 'small');
        };
        _proto.row = function row(name, value, icon) {
          if (icon === void 0) {
            icon = '';
          }
          return "<div class=\"stat-row\"><span>" + (icon ? ico(icon) : '') + esc(name) + "</span><b>" + value + "</b></div>";
        };
        _proto.arrow = function arrow(before, after) {
          return "<span class=\"change\">" + before + "<i>\u279C</i><em>" + after + "</em></span>";
        };
        _proto.section = function section(title) {
          return "<h3 class=\"section-title\"><span>" + ico('leaf') + esc(title) + "</span></h3>";
        };
        _proto.divider = function divider() {
          return '<div class="ornament-line"><i>✦</i></div>';
        };
        _proto.gear = function gear(g, slot, extra) {
          if (extra === void 0) {
            extra = '';
          }
          return "<div class=\"gear-tile " + (g ? '' : 'empty') + "\" style=\"--quality:" + (g ? Q[g.quality] : '#c4b6a6') + "\">" + (g ? this.img('icon' + g.slot) : '<span class="empty-slot-symbol">＋</span>') + (g ? "<b class=\"gear-level\">Lv." + g.level + "</b>" + (g.locked ? this.img('lock', 'gear-lock') : '') : '') + extra + "</div>";
        };
        _proto.roleBadge = function roleBadge(id) {
          return "<i class=\"role-badge r" + id + "\">" + ico(ROLE_ICONS[id]) + "</i>";
        };
        _proto.starRow = function starRow(n) {
          return "<span class=\"star-row\" aria-label=\"" + n + "\u661F\">" + '<i class="on">★</i>'.repeat(n) + '<i>★</i>'.repeat(Math.max(0, 5 - n)) + "</span>";
        };
        _proto.heroCard = function heroCard(id, o) {
          if (o === void 0) {
            o = {};
          }
          var b = this.port.model(),
            h = b.heroes[id],
            owned = b.owns(id);
          return "<div class=\"hero-card " + (owned ? '' : 'locked') + "\" title=\"" + NAMES[id] + "\" style=\"--quality:" + Q[o.rarity === undefined ? [4, 3, 2, 2][id] : o.rarity + 2] + "\">" + this.roleBadge(id) + (o.tag ? "<em class=\"card-tag " + (o.tag === 'NEW' ? 'new' : 'dup') + "\">" + o.tag + "</em>" : '') + "<div class=\"portrait\">" + this.face(id) + (o.deployed ? '<span class="deployed">已上阵</span>' : '') + (owned ? '' : this.img('lock', 'card-lock')) + "</div><span class=\"sr\">" + NAMES[id] + "</span><b>Lv." + h.level + "</b>" + this.starRow(h.stars) + "</div>";
        };
        _proto.reward = function reward(icon, n, label, quality) {
          if (quality === void 0) {
            quality = 2;
          }
          return "<div class=\"reward\" style=\"--quality:" + Q[quality] + "\">" + this.img(label === '强化石' ? 'material' : 'icon' + icon) + "<b>\xD7" + n + "</b><small>" + esc(label) + "</small></div>";
        };
        _proto.gearReward = function gearReward(slot, quality, level) {
          return "<div class=\"reward\" style=\"--quality:" + Q[quality] + "\">" + this.img('icon' + slot) + "<b>Lv." + level + "</b><small>" + QUALITY_NAMES[quality] + EQUIPMENT_PARTS[slot] + "</small></div>";
        };
        _proto.rewardItems = function rewardItems(r) {
          var _this7 = this;
          return this.reward(6, (r == null ? void 0 : r.gold) || 0, '金币', 4) + this.reward(7, (r == null ? void 0 : r.experience.reduce(function (n, v) {
            return n + v;
          }, 0)) || 0, '英雄经验') + ((r == null ? void 0 : r.equipment.map(function (g) {
            return _this7.gear(g);
          }).join('')) || '');
        };
        _proto.rewardList = function rewardList(b) {
          return this.rewardItems(b.offline);
        };
        _proto.rewardViewport = function rewardViewport(items, cls) {
          if (cls === void 0) {
            cls = '';
          }
          return "<div class=\"reward-scroll " + cls + "\" tabindex=\"0\" aria-label=\"\u5956\u52B1\u5217\u8868\uFF0C\u53EF\u4E0A\u4E0B\u6ED1\u52A8\"><div class=\"five-grid\">" + (items || '<p class="empty-message">暂无奖励</p>') + "</div></div>";
        };
        _proto.dungeonRewards = function dungeonRewards(id, difficulty) {
          var _this8 = this;
          var r = dungeonReward(id, difficulty);
          var items = '';
          if (r.gold) items += this.reward(6, r.gold, '金币');
          if (r.experience) items += this.reward(7, r.experience, '每位英雄经验');
          if (r.materials) items += this.reward(7, r.materials, '强化石');
          if (r.gear) items += [0, 1, 3].map(function (s, i) {
            return _this8.gearReward(s, [3, 2, 1][i], r.level);
          }).join('');
          return items;
        };
        _proto.draw = function draw() {
          this.inSecondary = false;
          this.root.classList.toggle('battle-mode', this.page === 'adventure' || this.page === 'dungeon' && !!this.port.model().dungeon.run && this.port.battle() !== this.port.model());
          this.backdrop.style.backgroundImage = "url(\"" + this.urls.scene0 + "\")";
          this.backdrop.style.display = 'none';
          this.content.innerHTML = this.page === 'adventure' ? this.adventure() : this.page === 'hero' ? this.hero() : this.page === 'bag' ? this.bag() : this.page === 'recruit' ? this.recruit() : this.dungeons();
        };
        _proto.adventure = function adventure() {
          var _this9 = this,
            _this$port$model$dung;
          var b = this.port.battle();
          return "<div class=\"battle-hud\">" + this.wallet() + this.button('☰', function () {
            return _this9.settings();
          }, 'menu quiet') + "<div class=\"stage-heading\"><h1>" + (this.page === 'dungeon' ? DUNGEONS[this.port.model().dungeon.run.id].name : '镇外森林') + "</h1><b data-live=\"wave\">\u7B2C" + b.wave + "\u6CE2</b><div class=\"checkpoint\"><i></i><i></i><i></i><i></i><i></i>\u2691</div><small data-live=\"checkpoint\">\u4E0B\u4E00\u68C0\u67E5\u70B9 \xB7 \u7B2C" + Math.ceil(b.wave / 10) * 10 + "\u6CE2</small></div><div class=\"turn-order\"><b>\u884C\u52A8\u987A\u5E8F</b>" + b.order.map(function (i) {
            return "<span class=\"turn-portrait\" data-turn=\"" + i + "\">" + (i < 3 ? _this9.face(b.formation[i]) : _this9.img('monster' + b.enemies[i - 3].kind)) + "</span>";
          }).join('<span class="turn-arrow">➜</span>') + "</div><div class=\"battle-tools\">" + this.button(this.port.speed() + '×', function () {
            _this9.port.setSpeed();
            _this9.draw();
          }, 'quiet') + this.button(this.img('nav7') + '<small>统计</small>', function () {
            return _this9.statistics();
          }, 'quiet') + this.button(this.img('nav8') + '<small>自动技能</small>', function () {
            var before = b.autoSkill;
            b.autoSkill = !before;
            var error = _this9.port.mutate(function () {
              return null;
            });
            if (error) {
              b.autoSkill = before;
              _this9.toast(error);
            }
            _this9.draw();
          }, 'quiet ' + (b.autoSkill ? 'on' : '')) + "</div><div class=\"field-actions\">" + this.button(this.img('nav5') + '阵型', function () {
            return _this9.formation();
          }, 'quiet') + (this.page === 'adventure' ? this.button(this.img('nav6') + '挂机收益', function () {
            return _this9.offline();
          }, 'quiet') : (_this$port$model$dung = this.port.model().dungeon.run) != null && _this$port$model$dung.receipt ? this.button('查看结算', function () {
            return _this9.result();
          }, 'quiet') : this.button('离开战斗', function () {
            _this9.port.leave();
            _this9.draw();
          }, 'quiet')) + "</div><div class=\"skill-bar\">" + b.formation.map(function (id, i) {
            var h = b.heroes[id];
            return "<section class=\"party-card\"><header>" + _this9.face(id) + "<div><b>" + NAMES[id] + "</b><span class=\"party-tags\"><i>Lv." + h.level + "</i><i class=\"role-pill r" + id + "\">" + ico(id === 0 ? 'shield' : ROLE_ICONS[id]) + ROLES[id] + "</i></span><div class=\"health-track\"><i data-hp=\"" + id + "\"></i></div><small data-hp-label=\"" + id + "\">" + h.hp + "/" + b.stats(id).hp + "</small><small data-shield=\"" + id + "\"></small></div></header><div class=\"active-skills\">" + [0, 2].map(function (skill, j) {
              return _this9.button(_this9.skillIcon(id, skill) + ("<span data-cooldown=\"" + id + "-" + j + "\"></span><small>" + (b.unlocked(id, skill) ? SKILL_NAMES[id][skill] : '待解锁') + "</small>"), function () {
                if (!b.requestSkill(i, j)) _this9.toast(b.unlocked(id, skill) ? '技能冷却中或英雄已阵亡' : SKILL_LEVELS[skill] + '级解锁');else {
                  var error = _this9.port.mutate(function () {
                    return null;
                  });
                  if (error) {
                    if (j) h.queued2 = false;else h.queued = false;
                    _this9.toast(error);
                  } else _this9.toast('已加入释放队列');
                }
              }, 'skill-button ' + (b.unlocked(id, skill) ? '' : 'unavailable'));
            }).join('') + "</div></section>";
          }).join('') + "</div>" + this.nav(this.page === 'dungeon' ? 'dungeon' : 'adventure') + "</div>";
        };
        _proto.skillIcon = function skillIcon(id, index) {
          var b = this.port.model();
          return this.img('ability' + (!b.unlocked(id, index) ? 3 : index % 2 === 1 ? 1 : id === 0 ? index === 0 ? 0 : 2 : id === 2 ? 5 : id === 1 ? 4 : 2));
        };
        _proto.settings = function settings() {
          var _this10 = this;
          var b = this.port.battle();
          this.popup('战斗设置', '<div class="info-pad">战斗倍速不影响体力恢复与挂机收益。</div>', this.button(b.paused ? '继续战斗' : '暂停战斗', function () {
            b.paused = !b.paused;
            _this10.close();
          }) + (this.page === 'dungeon' ? this.button('结束挑战', function () {
            _this10.close();
            _this10.port.end();
          }, 'peach') : ''), 'small');
        };
        _proto.statistics = function statistics() {
          var _this11 = this;
          var b = this.port.battle();
          this.popup('战斗统计', this.section('输出与治疗') + b.formation.map(function (i) {
            return _this11.row(NAMES[i], b.heroes[i].damage + ' / ' + b.heroes[i].healing, ROLE_ICONS[i]);
          }).join('') + this.row('承受伤害', b.received, 'shield') + this.row('战斗时长', Math.floor(b.elapsed) + '秒', 'clock'));
        };
        _proto.hero = function hero() {
          var _this12 = this;
          var b = this.port.model(),
            id = this.selected,
            h = b.heroes[id],
            s = b.stats(id),
            owned = b.owns(id);
          return "<div class=\"page hero-page\" style=\"--scene:url('" + this.urls.scene1 + "')\">" + this.wallet(false) + "<div class=\"hero-tabs\">" + HERO_CONFIG.map(function (c, i) {
            return _this12.button(_this12.face(i) + ("<b>" + c.name + "</b>"), function () {
              _this12.selected = i;
              _this12.draw();
            }, i === id ? 'selected' : 'quiet');
          }).join('') + "</div><div class=\"hero-stage\"><h1>" + HERO_CONFIG[id].name + " \xB7 Lv." + h.level + "</h1><div class=\"stars\">" + this.starRow(h.stars) + this.button(this.img('starIcon'), function () {
            return _this12.star();
          }, 'star-button', false, '英雄升星') + "</div><p class=\"roles\">" + ico(id === 0 ? 'shield' : ROLE_ICONS[id]) + ROLES[id] + "<span>" + (owned ? '已招募' : '尚未招募') + "</span></p><div class=\"equipment-left\">" + [0, 1, 2].map(function (slot) {
            return _this12.button(_this12.gear(b.equipment(id)[slot], slot) + ("<small>" + EQUIPMENT_PARTS[slot] + "</small>"), function () {
              return _this12.equipmentSlot(slot);
            }, 'equipment-slot');
          }).join('') + "</div>" + this.face(id, 'hero-figure') + "<div class=\"equipment-right\">" + [3, 4, 5].map(function (slot) {
            return _this12.button(_this12.gear(b.equipment(id)[slot], slot) + ("<small>" + EQUIPMENT_PARTS[slot] + "</small>"), function () {
              return _this12.equipmentSlot(slot);
            }, 'equipment-slot');
          }).join('') + "</div>" + this.button(ico('people') + '编队', function () {
            return _this12.formation();
          }, 'quiet formation-link') + "</div><div class=\"experience\"><small>\u7ECF\u9A8C " + h.experience + "/" + upgradeCost(h.level) + "</small><div class=\"exp-track\"><i style=\"width:" + Math.min(100, h.experience / upgradeCost(h.level) * 100) + "%\"></i></div></div><div class=\"page-actions\">" + this.button('一键换装', function () {
            return _this12.run(function (m) {
              return m.autoEquip(id);
            }, function () {
              return _this12.draw();
            });
          }, '', !owned) + this.button('升级', function () {
            return _this12.run(function (m) {
              return m.upgrade(id);
            }, function () {
              return _this12.draw();
            });
          }, '', !owned || h.level >= 100) + "</div><section class=\"cream-card skills-card\"><h3 class=\"card-title\">\u6280\u80FD</h3><div class=\"hero-skills\">" + [0, 1, 2, 3].map(function (i) {
            return _this12.button("<small class=\"kind\">" + (i % 2 ? '被动' : '主动') + "</small>" + _this12.skillIcon(id, i) + "<b>" + (b.unlocked(id, i) ? SKILL_NAMES[id][i] : '待解锁') + "</b><small>" + (b.unlocked(id, i) ? '已解锁' : SKILL_LEVELS[i] + '级解锁') + "</small>", function () {
              return _this12.skill(i);
            }, 'flat ' + (b.unlocked(id, i) ? '' : 'unavailable'), false, SKILL_NAMES[id][i]);
          }).join('') + "<i class=\"skill-divider\"></i>" + this.button(this.img('tree') + '<b>天赋树</b><small>' + b.talentPoints(id) + '点</small>', function () {
            return _this12.talents();
          }, 'flat tree-button') + "</div></section><section class=\"cream-card attributes\"><h3 class=\"card-title\">\u82F1\u96C4\u5C5E\u6027</h3><div class=\"two-grid\">" + (this.row('生命', s.hp, 'heart') + this.row('攻击', s.attack, 'sword') + this.row('防御', s.defense, 'shield') + this.row('移速', s.speed, 'speed') + this.row('技能效果', s.power, 'sparkle') + this.row('技能冷却', s.cooldown + '秒', 'clock')) + "</div></section>" + this.nav('hero') + "</div>";
        };
        _proto.star = function star() {
          var _this13 = this;
          var b = this.port.model(),
            id = this.selected,
            p = b.starPreview(id);
          if (!p) {
            this.info('英雄升星', '请先招募该英雄');
            return;
          }
          var max = p.stars >= 5;
          this.popup('英雄升星', "<div class=\"item-heading\"><div class=\"portrait-tile\" style=\"--quality:" + Q[[4, 3, 2, 2][id]] + "\">" + this.face(id) + "</div><div><h3>" + HERO_CONFIG[id].name + "</h3><p class=\"star-change\">" + '★'.repeat(p.stars) + "<i>\u279C</i>" + (max ? '已满星' : '★'.repeat(p.stars + 1)) + "</p></div></div>" + this.divider() + this.section('提升预览') + this.row('生命', this.arrow(p.before.hp, p.after.hp), 'heart') + this.row('攻击', this.arrow(p.before.attack, p.after.attack), 'sword') + this.row(SKILL_NAMES[id][0] + '效果', this.arrow(p.before.power, p.after.power), 'shield') + this.divider() + this.section('升星消耗') + ("<div class=\"cost-card\"><div class=\"portrait-tile small\" style=\"--quality:" + Q[[4, 3, 2, 2][id]] + "\">" + this.face(id) + "<b>\xD7" + p.cost + "</b></div><div><h3>" + HERO_CONFIG[id].name + "\u4EFD\u6570</h3><p>\u6301\u6709 <em class=\"" + (p.available >= p.cost ? '' : 'short') + "\">" + p.available + "</em> \u4EFD / \u6D88\u8017 " + p.cost + " \u4EFD</p></div></div>"), this.button(max ? '已满星' : '升星', function () {
            return _this13.run(function (m) {
              return m.starUp(id);
            }, function () {
              _this13.draw();
              _this13.star();
            });
          }, 'wide', max || p.available < p.cost));
        };
        _proto.skill = function skill(index) {
          var b = this.port.model(),
            id = this.selected,
            s = b.stats(id),
            passive = index % 2 === 1;
          var descriptions = [['为自己施加护盾，抵挡敌人的伤害。', '提升自身防御。', '挥盾打击攻击最高的敌人。', '强化两个主动技能的效果。'], ['向随机敌人投出火焰。', '强化主动技能效果。', '引爆生命比例最低的敌人。', '强化两个主动技能的效果。'], ['恢复生命比例最低的队友。', '提升主动治疗效果。', '为伤势最重的队友施加强效治疗。', '强化两个主动技能的效果。'], ['射出一箭，攻击随机敌人。', '提升普通攻击伤害。', '瞄准生命比例最低的敌人射击。', '强化两个主动技能的效果。']];
          var power = Math.round(s.power * (index === 2 ? 1.4 : 1));
          this.popup('技能详情', "<div class=\"item-heading\"><div class=\"skill-preview\">" + this.skillIcon(id, index) + "</div><div><h3>" + SKILL_NAMES[id][index] + "</h3><p class=\"pill\">" + (passive ? '被动' : '主动') + " \xB7 " + (b.unlocked(id, index) ? '已解锁' : SKILL_LEVELS[index] + '级解锁') + "</p></div></div>" + this.divider() + this.section('技能属性') + this.row(passive ? '解锁等级' : id === 2 ? '治疗量' : id === 0 && index === 0 ? '护盾值' : '技能效果', "<em>" + (passive ? 'Lv.' + SKILL_LEVELS[index] : power) + "</em>", passive ? 'star' : id === 2 ? 'heart' : id === 0 ? 'shield' : 'fire') + this.row(passive ? '生效方式' : '冷却', passive ? '自动生效' : "<em class=\"blue\">" + (index === 0 ? s.cooldown : b.secondCooldown(id)) + "\u79D2</em>", 'clock') + this.section('技能描述') + ("<div class=\"info-pad\">" + descriptions[id][index] + "</div>"));
        };
        _proto.treeLayout = function treeLayout() {
          var left = [[25, 86], [13, 70], [28, 55], [14, 39], [26, 23]],
            right = left.map(function (_ref4) {
              var x = _ref4[0],
                y = _ref4[1];
              return [100 - x, y];
            });
          return Array.from({
            length: 15
          }, function (_, i) {
            return i < 5 ? [50, 88 - i * 18.5] : i < 10 ? left[i - 5] : right[i - 10];
          });
        };
        _proto.talents = function talents(selected) {
          var _this14 = this;
          if (selected === void 0) {
            selected = 0;
          }
          var b = this.port.model(),
            id = this.selected;
          if (!b.owns(id)) {
            this.info('天赋树', '请先招募该英雄');
            return;
          }
          var tree = b.interfaceProgress.tree[id],
            pos = this.treeLayout();
          var icons = ['sparkle', 'shield', 'fire', 'heart', 'refresh', 'heart', 'shield', 'heart', 'shield', 'heart', 'sword', 'fire', 'sword', 'fire', 'sword'];
          var branch = function branch(o) {
            return pos.slice(o, o + 5).map(function (_ref5, k) {
              var x = _ref5[0],
                y = _ref5[1];
              return k ? "L" + x + " " + y : "M50 " + (y + 3) + "Q" + (50 + x) / 2 + " " + (y + 4) + " " + x + " " + y;
            }).join(' ').replace(/L/g, 'L');
          };
          var leaves = pos.map(function (_ref6, i) {
            var x = _ref6[0],
              y = _ref6[1];
            return i % 2 ? "<ellipse cx=\"" + (x + (x < 50 ? 6 : -6)) + "\" cy=\"" + (y - 6) + "\" rx=\"2.4\" ry=\"1.1\" transform=\"rotate(" + (x < 50 ? -35 : 35) + " " + (x + (x < 50 ? 6 : -6)) + " " + (y - 6) + ")\"/>" : '';
          }).join('');
          this.popup('天赋树', "<div class=\"talent-wallet\">" + this.face(id) + "<b>" + HERO_CONFIG[id].name + "</b><i></i>\u53EF\u7528\u5929\u8D4B\u70B9 <em>" + b.talentPoints(id) + "</em></div><div class=\"talent-tree\"><svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path class=\"trunk\" d=\"M50 98 L50 12\"/><path class=\"branch\" d=\"" + branch(5) + "\"/><path class=\"branch\" d=\"" + branch(10) + "\"/><g class=\"leaves\">" + leaves + "</g></svg>" + pos.map(function (_ref7, i) {
            var x = _ref7[0],
              y = _ref7[1];
            var ready = TREE_NODES[i].parent < 0 || tree[TREE_NODES[i].parent];
            return _this14.button(ico(icons[i]) + (tree[i] ? '<b>1/1</b>' : ''), function () {
              return _this14.talents(i);
            }, 'talent-node ' + (tree[i] ? 'learned ' : ready ? 'ready ' : '') + (i === selected ? 'current' : '') + ("\" style=\"left:" + x + "%;top:" + y + "%"), false, TREE_NODES[i].name);
          }).join('') + "</div><div class=\"talent-info\"><div><h3>" + TREE_NODES[selected].name + "</h3><p>" + TREE_NODES[selected].description + "</p></div><i></i><b>" + (tree[selected] ? '已学习' : '消耗 <em>1</em> 点') + "</b></div>", this.button('重置天赋', function () {
            return _this14.info('重置天赋', '返还该英雄已投入的全部天赋点？', function () {
              return _this14.run(function (m) {
                return m.resetTreeTalents(id);
              }, function () {
                return _this14.talents(selected);
              });
            });
          }, 'peach') + this.button('学习天赋', function () {
            return _this14.run(function (m) {
              return m.trainTreeTalent(id, selected);
            }, function () {
              return _this14.talents(selected);
            });
          }), 'large');
        };
        _proto.equipmentSlot = function equipmentSlot(slot) {
          if (!this.port.model().owns(this.selected)) {
            this.info('装备穿戴', '请先招募该英雄');
            return;
          }
          var g = this.port.model().equipment(this.selected)[slot];
          if (g) this.detail(g.id);else this.picker(slot);
        };
        _proto.filters = function filters(update) {
          var _this15 = this;
          return "<div class=\"filter-row\">" + this.button(ico('filter') + '筛选', function () {
            _this15.popup('品质筛选', "<div class=\"filter-options\">" + (_this15.button('全部品质', function () {
              _this15.quality = -1;
              update();
            }, 'quiet') + QUALITY_NAMES.map(function (q, i) {
              return _this15.button(q, function () {
                _this15.quality = i;
                update();
              }, _this15.quality === i ? '' : 'quiet');
            }).join('')) + "</div>", '', 'small');
          }, 'quiet') + this.button('品质 ' + (this.reverse ? '↑' : '↓') + ' ⌄', function () {
            _this15.reverse = !_this15.reverse;
            update();
          }, 'quiet') + "</div>";
        };
        _proto.filtered = function filtered(slot) {
          var _this16 = this;
          if (slot === void 0) {
            slot = this.part;
          }
          return this.port.model().inventory.filter(function (g) {
            return (slot < 0 || g.slot === slot) && (_this16.quality < 0 || g.quality === _this16.quality);
          }).slice().sort(function (a, b) {
            return (b.quality - a.quality) * (_this16.reverse ? -1 : 1) || b.level - a.level || b.id - a.id;
          });
        };
        _proto.picker = function picker(slot) {
          var _this17 = this;
          var b = this.port.model(),
            items = this.filtered(slot).filter(function (g) {
              return b.owner(g.id) < 0;
            });
          this.popup('装备选择', this.filters(function () {
            return _this17.picker(slot);
          }) + ("<div class=\"equipment-scroll\"><div class=\"five-grid\">" + items.map(function (g) {
            return _this17.button(_this17.gear(g), function () {
              return _this17.detail(g.id);
            }, 'flat');
          }).join('') + Array.from({
            length: Math.max(0, 20 - items.length)
          }, function () {
            return '<div class="gear-tile empty"></div>';
          }).join('') + "</div></div><div class=\"part-tabs labeled\">" + [-1, 0, 3, 4, 5, 1, 2].map(function (i) {
            return _this17.button((i < 0 ? ico('grid') : _this17.img('icon' + i)) + ("<small>" + (i < 0 ? '全部' : EQUIPMENT_PARTS[i]) + "</small>"), function () {
              return _this17.picker(i);
            }, i === slot ? 'selected' : 'flat');
          }).join('') + "</div>"), '', 'large');
        };
        _proto.gearRows = function gearRows(g, next, random) {
          var _this18 = this;
          if (random === void 0) {
            random = false;
          }
          var primary = gearPrimary(g),
            s = gearStats(g),
            after = next ? gearStats(next) : s;
          return ['hp', 'attack', 'defense', 'power'].filter(function (k) {
            return (random ? k !== primary : k === primary) && s[k] > 0;
          }).map(function (k) {
            return _this18.row(GEAR_ATTRIBUTE_NAMES[k], next && (!random || g.level % 10 === 9) ? _this18.arrow(s[k], after[k]) : s[k], {
              hp: 'heart',
              attack: 'sword',
              defense: 'shield',
              power: 'sparkle'
            }[k]);
          }).join('') || '<div class="info-pad compact">无</div>';
        };
        _proto.detail = function detail(id) {
          var _this19 = this,
            _g$effects;
          var b = this.port.model(),
            g = b.inventory.find(function (g) {
              return g.id === id;
            });
          if (!g) return;
          var owner = b.owner(id);
          this.popup('装备详情', "<div class=\"item-heading\">" + this.gear(g) + "<div><h3>" + gearName(g) + "</h3><p class=\"quality-pill\" style=\"--tone:" + QUALITY_TEXT[g.quality] + "\">" + QUALITY_NAMES[g.quality] + " \xB7 " + EQUIPMENT_PARTS[g.slot] + "</p><p class=\"pill\">Lv." + g.level + (g.enhancement ? ' · 强化 +' + g.enhancement : '') + "</p></div>" + this.button(this.img(g.locked ? 'lock' : 'unlock'), function () {
            return _this19.run(function (m) {
              return m.toggleLock(id);
            }, function () {
              return _this19.detail(id);
            });
          }, 'flat lock-button', false, g.locked ? '解除锁定' : '锁定装备') + "</div>" + this.divider() + this.section('基础属性') + this.gearRows(g) + this.section('随机属性') + this.gearRows(g, undefined, true) + ("<h3 class=\"section-title effect\"><span>" + ico('sparkle') + "\u88C5\u5907\u6548\u679C</span></h3><div class=\"effect-line\">" + ((_g$effects = g.effects) != null && _g$effects.length ? g.effects.map(function (e) {
            return ico('refresh') + (e === 'attack' ? '攻击力' : '最大生命值') + ' 提高<em>5%</em>';
          }).join('<br>') : '无') + "</div><small class=\"equip-owner\">" + (owner >= 0 ? '穿戴中：' + NAMES[owner] : '穿戴给：' + NAMES[this.selected]) + "</small>"), this.button('强化', function () {
            _this19.close();
            _this19.upgradePage(id);
          }, 'peach') + this.button(owner >= 0 ? '卸下' : '穿戴', function () {
            return _this19.run(function (m) {
              return m.equip(owner >= 0 ? owner : _this19.selected, owner >= 0 ? null : id, g.slot);
            }, function () {
              _this19.close();
              _this19.draw();
            });
          }));
        };
        _proto.upgradePage = function upgradePage(id) {
          var _this20 = this;
          var b = this.port.model(),
            g = b.inventory.find(function (g) {
              return g.id === id;
            });
          if (!g) return;
          this.inSecondary = true;
          this.root.classList.remove('battle-mode');
          var breakthrough = g.level % 10 === 9,
            cost = (g.quality + 1) * (breakthrough ? 15 : 4),
            gold = g.level * (breakthrough ? 100 : 30),
            after = gearUpgradePreview(g);
          var need = function need(have, n) {
            return "<b><em class=\"" + (have >= n ? '' : 'short') + "\">" + have + "</em>/" + n + "</b>";
          };
          this.content.innerHTML = "<div class=\"secondary upgrade-page\"><div class=\"forge-scene\" style=\"background-image:url('" + this.urls.scene4 + "')\">" + this.wallet(false) + "<h1 class=\"title-plaque plaque\">" + this.plate('装备强化') + "</h1><div class=\"forge-item\">" + this.gear(g) + "<div><h2>" + gearName(g) + "</h2><p class=\"quality-pill\" style=\"--tone:" + QUALITY_TEXT[g.quality] + "\">" + QUALITY_NAMES[g.quality] + " \xB7 " + EQUIPMENT_PARTS[g.slot] + "</p></div></div>" + this.img('icon' + g.slot, 'forge-weapon') + "</div><div class=\"upgrade-body\"><h1 class=\"level-preview\">" + (g.level >= 100 ? 'Lv.100 · 已达上限' : 'Lv.' + g.level + ' <i>➜</i> <em>Lv.' + (g.level + 1) + '</em>') + "</h1>" + (this.section('基础属性') + this.gearRows(g, after) + this.section('随机属性') + this.gearRows(g, after, true)) + (breakthrough ? '<p class="breakthrough-note"><span>◇　突破提升基础属性与随机属性　◇</span></p>' : '') + "<div class=\"upgrade-costs\"><div><span class=\"cost-icon\">" + this.img('material') + "</span>" + need(b.materials, cost) + "</div><div><span class=\"cost-icon\">" + this.img('icon6') + "</span>" + need(b.gold, gold) + "</div>" + this.button(g.level >= 100 ? '已满级' : breakthrough ? '突破' : '升级', function () {
            return _this20.run(function (m) {
              return m.upgradeGear(id);
            }, function () {
              return _this20.upgradePage(id);
            });
          }, '', g.level >= 100) + "</div>" + this.button('关闭', function () {
            return _this20.draw();
          }, 'secondary-close') + "</div></div>";
        };
        _proto.bag = function bag() {
          var _this21 = this;
          var b = this.port.model(),
            items = this.filtered(),
            cap = Math.max(b.interfaceProgress.capacity, b.inventory.length),
            cost = 500 * (1 + Math.floor((b.interfaceProgress.capacity - 200) / 50));
          return "<div class=\"page bag-page\" style=\"--scene:url('" + this.urls.scene5 + "')\">" + this.wallet(false) + "<div class=\"main-tabs\">" + ['装备', '材料', '道具'].map(function (t, i) {
            return _this21.button(t, function () {
              _this21.category = i;
              _this21.draw();
            }, i === _this21.category ? 'selected' : 'quiet');
          }).join('') + "</div>" + (this.category === 0 ? "<div class=\"part-tabs\">" + [-1, 0, 1, 2, 3, 4, 5].map(function (i) {
            return _this21.button(i < 0 ? ico('grid') : _this21.img('icon' + i), function () {
              _this21.part = i;
              _this21.draw();
            }, i === _this21.part ? 'selected' : 'quiet', false, i < 0 ? '全部' : EQUIPMENT_PARTS[i]);
          }).join('') + "</div>" + this.filters(function () {
            _this21.close();
            _this21.draw();
          }) : '') + "<div class=\"bag-scroll cream-card\"><div class=\"five-grid\">" + (this.category === 0 ? items.map(function (g) {
            return _this21.button(_this21.gear(g), function () {
              return _this21.detail(g.id);
            }, 'flat');
          }).join('') + Array.from({
            length: Math.max(0, 25 - items.length)
          }, function () {
            return '<div class="gear-tile empty"></div>';
          }).join('') : this.category === 1 ? this.reward(7, b.materials, '强化石') : '<p class="empty-message">暂无道具</p>') + "</div></div><div class=\"bag-footer\"><b>\u5BB9\u91CF " + b.inventory.length + "/" + cap + "</b>" + this.button(ico('plus') + this.img('icon6') + cost + ' 扩容', function () {
            return _this21.confirm('提示', "\u662F\u5426\u6D88\u8017 " + _this21.img('icon6', 'inline-icon') + " <b>" + cost + "</b><br>\u5C06\u80CC\u5305\u5BB9\u91CF\u6269\u5145\u81F3 <b>" + (b.interfaceProgress.capacity + 50) + "</b> \u683C\uFF1F<small>\u5F53\u524D\u5BB9\u91CF " + b.inventory.length + "/" + cap + "</small>", function () {
              return _this21.run(function (m) {
                return m.expandBag();
              }, function () {
                return _this21.draw();
              });
            });
          }, 'quiet expand-button') + this.button('批量分解', function () {
            return _this21.salvage();
          }, 'salvage-button') + "</div>" + this.nav('bag') + "</div>";
        };
        _proto.salvage = function salvage(selected) {
          var _this22 = this;
          if (selected === void 0) {
            selected = new Set();
          }
          var b = this.port.model(),
            items = b.inventory.filter(function (g) {
              return !g.locked && b.owner(g.id) < 0;
            }),
            preview = b.salvagePreview([].concat(selected));
          var redraw = function redraw() {
            return _this22.salvage(selected);
          };
          this.popup('装备分解', "<p class=\"label-line\">\u6309\u54C1\u8D28\u9009\u62E9</p><div class=\"quality-checks\">" + QUALITY_NAMES.map(function (q, i) {
            var subset = items.filter(function (g) {
                return g.quality === i;
              }),
              on = subset.length > 0 && subset.every(function (g) {
                return selected.has(g.id);
              });
            return _this22.button("<i class=\"box " + (on ? 'on' : '') + "\">" + (on ? ico('check') : '') + "</i><span style=\"color:" + QUALITY_TEXT[i] + "\">" + q + "</span>", function () {
              var all = subset.every(function (g) {
                return selected.has(g.id);
              });
              subset.forEach(function (g) {
                return all ? selected["delete"](g.id) : selected.add(g.id);
              });
              redraw();
            }, 'flat check-option');
          }).join('') + "</div><p class=\"lock-note\">" + ico('lock') + "\u9501\u5B9A\u548C\u5DF2\u7A7F\u6234\u88C5\u5907\u4E0D\u53C2\u4E0E\u5206\u89E3</p><div class=\"list-heading\"><b>\u53EF\u5206\u89E3\u88C5\u5907</b><span>\u5DF2\u9009\u62E9 <em>" + selected.size + "\u4EF6</em></span></div><div class=\"equipment-scroll salvage-scroll\"><div class=\"five-grid\">" + items.map(function (g) {
            return _this22.button(_this22.gear(g, g.slot, selected.has(g.id) ? "<span class=\"checked\">" + ico('check') + "</span>" : ''), function () {
              selected.has(g.id) ? selected["delete"](g.id) : selected.add(g.id);
              redraw();
            }, 'flat');
          }).join('') + "</div></div><div class=\"material-line\"><b>\u53EF\u83B7\u5F97\u6750\u6599</b><span>" + this.img('material') + "\xD7" + preview.materials + "</span></div>", this.button('分解装备', function () {
            return _this22.info('确认分解', '分解后装备无法恢复，是否分解选中的' + selected.size + '件装备？', function () {
              return _this22.run(function (m) {
                return m.salvage([].concat(selected));
              }, function () {
                _this22.draw();
                _this22.rewards(_this22.reward(7, preview.materials, '强化石'));
              });
            });
          }, '', !selected.size) + ("<small class=\"warn\">" + ico('warn') + "\u5206\u89E3\u540E\u65E0\u6CD5\u6062\u590D</small>"), 'large');
        };
        _proto.recruit = function recruit() {
          var _this23 = this;
          var b = this.port.model(),
            r = b.recruitment,
            p = r.pity[this.pool],
            left = RECRUIT_CONFIG.legendPity - p.legend;
          var cast = this.pool ? [[3, 'c-back'], [2, 'c-left'], [0, 'c-right'], [1, 'c-front']] : [[3, 'c-left'], [1, 'c-back'], [2, 'c-right'], [0, 'c-front']];
          return "<div class=\"page recruit-page " + (this.pool ? 'up' : 'normal') + "\" style=\"background-image:url('" + this.urls['scene' + (this.pool ? 3 : 2)] + "')\"><header class=\"wallet\">" + this.button('☰', function () {
            return _this23.info('招募说明', '常驻券与UP券分别使用，两池保底独立计算。');
          }, 'menu quiet') + this.resource(6, b.gold) + "<span class=\"resource ticket-resource\">" + this.img('ticket', this.pool ? 'up-ticket' : '') + "<b>" + (this.pool ? b.interfaceProgress.upTickets : r.tickets) + "</b></span></header><div class=\"main-tabs\">" + ['常驻招募', 'UP招募'].map(function (t, i) {
            return _this23.button(t, function () {
              _this23.pool = i;
              _this23.draw();
            }, _this23.pool === i ? 'selected' : 'quiet');
          }).join('') + "</div><div class=\"recruit-banner\"><h1>" + LAUREL + "<span>" + (this.pool ? '星光邀约' : '冒险伙伴') + "</span>" + LAUREL.replace('class="laurel"', 'class="laurel mirror"') + "</h1><p class=\"ribbon\">" + (this.pool ? '艾琳概率提升' : '永久开放') + "</p></div><div class=\"recruit-cast\">" + cast.map(function (_ref8) {
            var id = _ref8[0],
              cls = _ref8[1];
            return _this23.face(id, 'cast ' + cls);
          }).join('') + (this.pool ? '<span class="up-badge">艾琳<b>UP</b></span>' : '') + "</div><div class=\"recruit-bottom\"><div class=\"pity-panel\"><span class=\"crown\">" + ico('crown') + "</span><div><p>\u5F53\u524D\u62BD\u6570 <em>" + p.legend + "</em>/" + RECRUIT_CONFIG.legendPity + "</p><div class=\"exp-track\"><i style=\"width:" + p.legend / RECRUIT_CONFIG.legendPity * 100 + "%\"></i></div><small>\u8DDD\u79BB\u4F20\u8BF4\u4FDD\u5E95\u8FD8\u9700<em>" + left + "</em>\u62BD</small></div></div><div class=\"pool-links\">" + this.button(ico('book') + '卡池详情', function () {
            return _this23.poolDetails();
          }, 'quiet') + this.button(ico('list') + '招募记录', function () {
            return _this23.results(r.history.filter(function (x) {
              return x.pool === _this23.pool;
            }).slice(-10), true);
          }, 'quiet') + "</div><div class=\"page-actions\">" + this.drawButtons() + "</div></div>" + this.nav('recruit') + "</div>";
        };
        _proto.ticketChip = function ticketChip(n) {
          return "<small class=\"ticket-chip\">" + this.img('ticket', this.pool ? 'up-ticket' : '') + "\xD7" + n + "</small>";
        };
        _proto.drawButtons = function drawButtons(peach) {
          var _this24 = this;
          if (peach === void 0) {
            peach = false;
          }
          return [1, 10].map(function (n) {
            return _this24.button("<b>\u62DB\u52DF" + (n === 1 ? '一次' : '十次') + "</b>" + _this24.ticketChip(n), function () {
              if (_this24.run(function (m) {
                return m.recruitPool(_this24.pool, n);
              })) {
                _this24.draw();
                _this24.results(_this24.port.model().recruitment.last);
              }
            }, peach && n === 1 ? 'peach' : '');
          }).join('');
        };
        _proto.poolDetails = function poolDetails() {
          var _this25 = this;
          var up = this.pool === 1;
          this.popup(up ? 'UP池详情' : '常驻池详情', "<p class=\"pool-name\">" + (up ? '星光邀约 · 艾琳概率提升' : '冒险伙伴 · 永久开放') + "</p>" + this.section('卡池内容') + ("<div class=\"pool-heroes\">" + (up ? [1, 0, 2, 3] : [0, 1, 2, 3]).map(function (i) {
            return "<div class=\"portrait-tile\" style=\"--quality:" + Q[[4, 3, 2, 2][i]] + "\">" + _this25.face(i) + (up && i === 1 ? '<span class="up-mark">UP</span>' : '') + "<small>" + NAMES[i] + "</small></div>";
          }).join('') + "</div>") + this.section('抽取概率') + [['稀有', 'star', '#3b8fe0', '75%'], ['史诗', 'crown', '#9a4fd0', '20%'], ['传说', 'crown', '#e6a514', '5%']].map(function (_ref9) {
            var q = _ref9[0],
              icon = _ref9[1],
              color = _ref9[2],
              v = _ref9[3];
            return "<div class=\"stat-row rate\"><span><i style=\"color:" + color + "\">" + ico(icon) + "</i>" + q + "</span><b>" + v + "</b></div>";
          }).join('') + this.section('规则说明') + ("<ul class=\"rules\">" + (up ? ['传说必得艾琳，其余品质艾琳概率62.5%。', 'UP池与常驻池保底独立计算。'] : ['四位英雄等概率出现。', '常驻池与UP池保底独立计算。']).concat(['10抽至少史诗，30抽必得传说。', '单抽与十连共享本池保底。']).map(function (t) {
            return "<li>" + t + "</li>";
          }).join('') + "</ul>"));
        };
        _proto.results = function results(rows, history) {
          var _this26 = this;
          if (history === void 0) {
            history = false;
          }
          if (!rows.length) {
            this.info('招募记录', '暂无记录');
            return;
          }
          var one = rows.length === 1,
            b = this.port.model();
          this.popup(history ? '招募记录' : '招募结果', "<p class=\"result-sub\">\u672C\u6B21\u62DB\u52DF\u83B7\u5F97<em>" + rows.length + "</em>\u4F4D\u82F1\u96C4</p><div class=\"result-cards " + (one ? 'single' : 'five-grid') + "\">" + rows.map(function (r) {
            return _this26.heroCard(r.hero, {
              rarity: r.rarity,
              tag: r.fresh ? 'NEW' : '重复'
            });
          }).join('') + "</div><p class=\"ticket-left\">" + this.img('ticket', this.pool ? 'up-ticket' : '') + "\u5269\u4F59<b>" + (this.pool ? b.interfaceProgress.upTickets : b.recruitment.tickets) + "</b></p>", history ? '' : this.drawButtons(true), 'fullscreen results-screen');
        };
        _proto.lineup = function lineup() {
          var _this27 = this;
          var b = this.port.model();
          return "<div class=\"lineup\">" + b.formation.map(function (id) {
            return "<span class=\"round-face\"><span class=\"disc\">" + _this27.face(id) + "</span><b>Lv." + b.heroes[id].level + "</b></span>";
          }).join('') + "<i></i>" + this.button(ico('people') + '<small>阵型</small>', function () {
            return _this27.formation();
          }, 'quiet lineup-button') + "</div>";
        };
        _proto.dungeons = function dungeons() {
          var _this28 = this;
          if (this.port.model().dungeon.run && this.port.battle() !== this.port.model()) return this.adventure();
          var b = this.port.model();
          var body = '';
          if (this.dungeonTab === 0) body = "<div class=\"dungeon-list\">" + [0, 1, 2, 3].map(function (id) {
            return "<article class=\"dungeon-card\"><img src=\"" + _this28.urls['dungeon' + id] + "\" alt=\"" + DUNGEONS[id].name + "\"><div><h2>" + DUNGEONS[id].name + "</h2><div class=\"drop-icons\">" + _this28.dungeonRewards(id, 0) + "</div><footer><small>\u6D88\u8017\u4F53\u529B " + ico('bolt') + "\xD710</small>" + _this28.button('挑战', function () {
              return _this28.challenge(id);
            }) + "</footer></div></article>";
          }).join('') + "</div>";else if (this.dungeonTab === 1) {
            var r = dungeonReward(5, 0);
            body = "<article class=\"feature-card endless-card\"><div class=\"feature-art\" style=\"background-image:url('" + (this.urls.endlessArt || this.urls.dungeon3) + "')\"><div class=\"feature-title\"><div class=\"title-row\">" + LAUREL + "<h2>\u65E0\u5C3D\u8BD5\u70BC</h2>" + LAUREL.replace('class="laurel"', 'class="laurel mirror"') + "</div><p class=\"ribbon\">\u8FDE\u7EED\u95EF\u5173\uFF0C\u76F4\u5230\u5168\u961F\u9635\u4EA1</p></div>" + this.button(ico('question'), function () {
              return _this28.info('无尽试炼', '每关击败三名敌人，继续向更高层进发。全队阵亡后结算本次挑战奖励。');
            }, 'flat help-button', false, '无尽规则') + "</div><div class=\"feature-panel\"><div class=\"feature-row record\">" + ico('trophy') + "<b>\u6700\u9AD8\u901A\u5173 <strong>" + Math.max(0, b.dungeon.floor - 1) + "\u5173</strong></b><i></i><small>\u672C\u6B21\u4ECE\u7B2C1\u5173\u5F00\u59CB</small></div><div class=\"feature-row\"><b>\u6BCF\u901A\u51731\u5173\u83B7\u5F97</b><div class=\"feature-rewards\">" + this.reward(6, r.gold, '金币') + "<span>" + this.reward(7, r.experience, '经验') + "<small>\u6BCF\u4F4D\u82F1\u96C4</small></span>" + this.reward(7, r.materials, '强化石') + "</div></div><div class=\"feature-row\"><b>\u51FA\u6218\u9635\u5BB9</b>" + this.lineup() + "</div><div class=\"feature-row\"><b>\u5165\u573A\u6D88\u8017 " + ico('bolt') + "\xD710</b><i></i><small>\u5355\u6B21\u5165\u573A\uFF0C\u8FDE\u7EED\u6311\u6218</small>" + this.button('挑战', function () {
              return _this28.challenge(5);
            }, 'go-button') + "</div></div></article>";
          } else {
            var left = 2 - b.dungeon.dailyUsed;
            body = "<article class=\"feature-card daily-card\"><header><h2>" + DUNGEONS[4].name + "</h2><i></i><span class=\"today\">" + ico('calendar') + "\u4ECA\u65E5\u6311\u6218 " + left + "/2</span></header><div class=\"feature-art\" style=\"background-image:url('" + (this.urls.dailyArt || this.urls.dungeon3) + "')\"></div><div class=\"feature-panel\"><div class=\"feature-row\"><b>\u5956\u52B1\u9884\u89C8</b><div class=\"feature-rewards\">" + this.reward(6, 1500, '金币') + "<span>" + this.reward(7, 600, '经验') + "<small>\u6BCF\u4F4D\u82F1\u96C4</small></span>" + this.reward(7, 15, '强化石') + "</div></div><div class=\"feature-row\"><b>\u51FA\u6218\u9635\u5BB9</b>" + this.lineup() + "</div><div class=\"feature-row\"><b>\u6D88\u8017\u4F53\u529B " + ico('bolt') + "\xD710</b>" + this.button('挑战', function () {
              return _this28.challenge(4);
            }, 'go-button') + "</div></div></article>";
          }
          return "<div class=\"page dungeon-page\" style=\"--scene:url('" + this.urls.scene5 + "')\">" + this.wallet() + "<div class=\"main-tabs\">" + ['资源副本', '无尽挑战', '每日副本'].map(function (t, i) {
            return _this28.button(t, function () {
              _this28.dungeonTab = i;
              _this28.draw();
            }, _this28.dungeonTab === i ? 'selected' : 'quiet');
          }).join('') + "</div>" + (b.dungeon.run ? this.button('继续挑战', function () {
            _this28.port.resume();
            _this28.draw();
          }, 'resume-button') : '') + body + this.nav('dungeon') + "</div>";
        };
        _proto.challenge = function challenge(id) {
          var _this29 = this;
          var b = this.port.model(),
            cost = [10, 15, 20][this.difficulty];
          this.popup('副本挑战', "<div class=\"challenge-heading\"><img src=\"" + (id === 5 ? this.urls.endlessArt || this.urls.dungeon3 : id === 4 ? this.urls.dailyArt || this.urls.dungeon3 : this.urls['dungeon' + id]) + "\" alt=\"\"><div><h3>" + DUNGEONS[id].name + "</h3><small>" + (id === 5 ? '无限关卡 · 阵亡后结束' : '共10波 · 末波首领') + "</small>" + (id === 4 ? '<small>今日剩余 ' + (2 - b.dungeon.dailyUsed) + '/2 次</small>' : '') + "</div></div>" + this.divider() + this.section('选择难度') + ("<div class=\"main-tabs\">" + DIFFICULTIES.map(function (t, i) {
            return _this29.button(t, function () {
              _this29.difficulty = i;
              _this29.challenge(id);
            }, i === _this29.difficulty ? 'selected' : 'quiet');
          }).join('') + "</div>") + this.row('推荐等级', 'Lv.' + [1, 8, 15][this.difficulty]) + this.divider() + this.section('奖励预览') + this.rewardViewport(this.dungeonRewards(id, this.difficulty)) + this.row('当前体力', b.dungeon.stamina + '/120', 'bolt'), "<p class=\"challenge-cost\">\u6D88\u8017\u4F53\u529B " + ico('bolt') + "\xD7" + cost + "</p>" + this.button('开始挑战', function () {
            _this29.close();
            _this29.port.start(id, _this29.difficulty);
            _this29.draw();
          }), 'large challenge-dialog');
        };
        _proto.offline = function offline() {
          var _this30 = this;
          var b = this.port.model(),
            r = b.offline,
            cp = (r == null ? void 0 : r.checkpoint) || b.highestWave,
            scale = 1 + Math.floor((cp - 1) / 5),
            sec = (r == null ? void 0 : r.seconds) || 0,
            clock = [Math.floor(sec / 3600), Math.floor(sec % 3600 / 60), Math.floor(sec % 60)].map(function (n) {
              return ('0' + n).slice(-2);
            }).join(':');
          this.popup('挂机奖励', "<p class=\"pool-name lined\">\u9547\u5916\u68EE\u6797 \xB7 \u68C0\u67E5\u70B9 " + cp + "</p><div class=\"offline-rates\">" + this.resource(6, '+' + 7200 * scale + '/小时') + this.resource(7, '+' + 5760 * scale + '/小时') + "</div><p class=\"idle-time\"><span>" + ico('clock') + "\u6302\u673A\u65F6\u95F4 " + (r ? clock : '--:--:--') + "</span><small>\u4E0A\u96508\u5C0F\u65F6</small></p>" + this.divider() + this.rewardViewport(this.rewardList(b)) + this.divider(), this.button('快速扫荡' + ("<small>" + ico('bolt') + "\xD710</small>"), function () {
            return _this30.quick();
          }, 'peach') + this.button('领取', function () {
            var items = _this30.rewardList(b);
            _this30.run(function (m) {
              return m.claimOffline();
            }, function () {
              _this30.draw();
              _this30.rewards(items);
            });
          }, '', !r), 'large');
        };
        _proto.quick = function quick() {
          var _this31 = this;
          this.info('快速扫荡', '消耗10体力，获得30分钟挂机收益？', function () {
            var reward = null;
            _this31.run(function (m) {
              var result = m.quickSweep();
              reward = result.reward;
              return result.error;
            }, function () {
              return _this31.rewards(_this31.rewardItems(reward));
            });
          });
        };
        _proto.rewards = function rewards(items) {
          this.popup('恭喜获得', this.rewardViewport(items), '', 'fullscreen rewards-fullscreen');
        }
        /** Formation slot placement: front row on the right, back row on the left (rates come from FORMATIONS). */;
        _proto.placement = function placement(rates) {
          var even = Math.max.apply(Math, rates) - Math.min.apply(Math, rates) < 5;
          if (even) return [{
            x: 72,
            y: 30,
            front: true
          }, {
            x: 48,
            y: 52,
            front: false
          }, {
            x: 24,
            y: 74,
            front: false
          }];
          if (rates[1] >= rates[0] * .9) return [{
            x: 72,
            y: 28,
            front: true
          }, {
            x: 72,
            y: 72,
            front: true
          }, {
            x: 28,
            y: 50,
            front: false
          }];
          return [{
            x: 72,
            y: 50,
            front: true
          }, {
            x: 28,
            y: 22,
            front: false
          }, {
            x: 30,
            y: 74,
            front: false
          }];
        };
        _proto.formation = function formation() {
          var _this32 = this;
          var b = this.port.battle();
          var draft = b.formation.slice(),
            preset = this.port.model().interfaceProgress.preset;
          this.inSecondary = true;
          this.root.classList.remove('battle-mode');
          this.backdrop.style.display = 'none';
          var render = function render() {
            var f = FORMATIONS[_this32.port.model().interfaceProgress.formation],
              place = _this32.placement(f.rates);
            _this32.content.innerHTML = "<div class=\"secondary formation-page\"><div class=\"formation-scene\" style=\"background-image:url('" + _this32.urls.scene1 + "')\"><h1 class=\"title-plaque plaque\">" + _this32.plate('编队') + "</h1><div class=\"standing-heroes\">" + [0, 1, 2].map(function (slot) {
              var p = place[slot],
                style = "left:" + p.x + "%;top:" + p.y + "%";
              return draft[slot] === undefined ? _this32.button('＋', function () {
                return _this32.toast('点击下方英雄卡片上阵');
              }, 'empty-position" style="' + style, false, '空位') : _this32.button("<span class=\"role-tag\">" + _this32.roleBadge(draft[slot]) + HERO_CONFIG[draft[slot]].name + " \xB7 " + ROLES[draft[slot]] + "</span>" + _this32.face(draft[slot]) + "<span class=\"row-plaque\">" + (p.front ? '前排' : '后排') + "</span><small>\u53D7\u51FB\u7387 " + f.rates[slot] + "%</small>", function () {
                draft.splice(slot, 1);
                render();
              }, 'standing ' + (p.front ? 'front' : 'back') + '" style="' + style, false, NAMES[draft[slot]]);
            }).join('') + "</div></div><div class=\"formation-sheet\"><div class=\"formation-toolbar\"><b>\u5DF2\u4E0A\u9635 " + draft.length + "/3</b><i></i><div class=\"preset-buttons\">" + [0, 1, 2, 3].map(function (i) {
              return _this32.button(String(i + 1), function () {
                preset = i;
                draft = _this32.port.model().interfaceProgress.presets[i].filter(function (id) {
                  return _this32.port.model().owns(id);
                });
                render();
              }, i === preset ? 'selected' : 'quiet');
            }).join('') + "</div><i></i><span class=\"formation-name\">" + f.name + "</span>" + _this32.button(ico('people') + '阵型选择', function () {
              return _this32.formationTypes(render);
            }) + "</div><div class=\"roster-grid\">" + HERO_CONFIG.map(function (h, id) {
              return _this32.button(_this32.heroCard(id, {
                deployed: draft.indexOf(id) >= 0
              }), function () {
                if (!_this32.port.model().owns(id)) {
                  _this32.toast('请先招募该英雄');
                  return;
                }
                var i = draft.indexOf(id);
                if (i >= 0) draft.splice(i, 1);else if (draft.length < 3) draft.push(id);else _this32.toast('最多上阵三名英雄，请先移除一位');
                render();
              }, 'flat', false, NAMES[id]);
            }).join('') + "</div></div>" + _this32.button('关闭', function () {
              if (!draft.length) {
                _this32.toast('至少上阵一名英雄');
                return;
              }
              var error = _this32.port.formation(draft);
              if (error) {
                _this32.toast(error);
                return;
              }
              _this32.run(function (m) {
                m.interfaceProgress.presets[preset] = draft.slice();
                m.interfaceProgress.preset = preset;
                return null;
              }, function () {
                _this32.port.navigate(_this32.page);
                _this32.draw();
              });
            }, 'secondary-close') + "</div>";
          };
          render();
        };
        _proto.formationTypes = function formationTypes(back, pick) {
          var _this33 = this;
          if (pick === void 0) {
            pick = this.port.model().interfaceProgress.formation;
          }
          var team = this.port.battle().formation,
            heroes = [0, 1, 2].map(function (n) {
              var _ref10, _team$n;
              return (_ref10 = (_team$n = team[n]) != null ? _team$n : [0, 1, 2].filter(function (i) {
                return team.indexOf(i) < 0;
              })[n - team.length]) != null ? _ref10 : n;
            });
          this.popup('阵型选择', "<div class=\"two-grid formation-types\">" + FORMATIONS.map(function (f, i) {
            var place = _this33.placement(f.rates);
            return _this33.button("<header>" + ico(['shield', 'sword', 'people', 'bolt'][i]) + "<h3>" + f.name + "</h3><small>\u540E\u6392 \u279C \u524D\u6392</small><i class=\"radio " + (pick === i ? 'on' : '') + "\">" + (pick === i ? ico('check') : '') + "</i></header><div class=\"formation-mini\">" + [0, 1, 2].map(function (n) {
              return "<div style=\"left:" + place[n].x + "%;top:" + place[n].y + "%\">" + _this33.face(heroes[n]) + "<b>\u53D7\u51FB\u7387 " + f.rates[n] + "%</b></div>";
            }).join('') + "</div>", function () {
              return _this33.formationTypes(back, i);
            }, 'flat formation-option ' + (pick === i ? 'picked' : ''), false, f.name);
          }).join('') + "</div><p class=\"formation-note\">" + ico('leaf') + "\u53D7\u51FB\u7387\u51B3\u5B9A\u654C\u4EBA\u666E\u901A\u653B\u51FB\u7684\u76EE\u6807\u6982\u7387" + ico('leaf', 'mirror') + "</p>", this.button('使用阵型', function () {
            return _this33.run(function (m) {
              m.interfaceProgress.formation = pick;
              return null;
            }, function () {
              _this33.port.battle().interfaceProgress.formation = pick;
              _this33.close();
              back();
            });
          }, 'wide'), 'large');
        };
        _proto.update = function update() {
          var _this34 = this,
            _this$port$model$dung3;
          var now = performance.now();
          if (now - this.lastUpdate < 50) return;
          this.lastUpdate = now;
          var b = this.port.battle();
          this.root.querySelectorAll('.wallet').forEach(function (wallet) {
            var values = wallet.querySelectorAll('.resource b');
            if (values[0]) values[0].textContent = String(_this34.port.model().gold);
            if (values[1] && !wallet.querySelector('.ticket-resource')) values[1].textContent = _this34.port.model().dungeon.stamina + '/120';
          });
          if (this.root.classList.contains('battle-mode')) {
            var _this$port$model$dung2;
            var checkpoint = this.root.querySelector('[data-live="checkpoint"]');
            if (checkpoint) checkpoint.textContent = '下一检查点 · 第' + Math.ceil((b.wave + 1) / 10) * 10 + '波';
            var wave = this.root.querySelector('[data-live="wave"]');
            if (wave) wave.textContent = this.page === 'dungeon' ? '第' + b.wave + (((_this$port$model$dung2 = this.port.model().dungeon.run) == null ? void 0 : _this$port$model$dung2.id) === 5 ? '关' : '波') : '第' + b.wave + '波';
            this.root.querySelectorAll('[data-turn]').forEach(function (n) {
              var i = Number(n.dataset.turn);
              n.classList.toggle('turn-current', b.nextActor === i);
              if (i >= 3) {
                var image = n.querySelector('img');
                if (image && image.src !== _this34.urls['monster' + b.enemies[i - 3].kind]) image.src = _this34.urls['monster' + b.enemies[i - 3].kind];
              }
            });
            b.formation.forEach(function (id) {
              var h = b.heroes[id],
                bar = _this34.root.querySelector("[data-hp=\"" + id + "\"]"),
                label = _this34.root.querySelector("[data-hp-label=\"" + id + "\"]"),
                shield = _this34.root.querySelector("[data-shield=\"" + id + "\"]");
              if (bar) bar.style.width = Math.max(0, h.hp / b.stats(id).hp * 100) + '%';
              if (label) label.textContent = '♥ ' + h.hp + '/' + b.stats(id).hp;
              if (shield) shield.textContent = h.shield > 0 ? '⬟ ' + h.shield : '';
              [0, 1].forEach(function (j) {
                var n = _this34.root.querySelector("[data-cooldown=\"" + id + "-" + j + "\"]");
                if (n) n.textContent = (j ? h.queued2 : h.queued) ? '待释放' : (j ? h.cooldown2 : h.cooldown) > 0 ? (j ? h.cooldown2 : h.cooldown).toFixed(1) : '';
              });
            });
          }
          var receipt = (_this$port$model$dung3 = this.port.model().dungeon.run) == null ? void 0 : _this$port$model$dung3.receipt;
          if (receipt && this.page === 'dungeon' && this.port.battle() !== this.port.model()) {
            var key = JSON.stringify(receipt);
            if (this.lastReceipt !== key) {
              this.lastReceipt = key;
              this.draw();
              this.result();
            }
          } else if (!receipt) this.lastReceipt = '';
          var off = this.port.model().offline;
          if (off && off !== this.lastOffline && !this.modal.childElementCount && !this.inSecondary) {
            this.lastOffline = off;
            this.offline();
          }
        };
        _proto.result = function result() {
          var _this35 = this;
          var b = this.port.battle(),
            r = this.port.model().dungeon.run,
            p = r.receipt;
          this.popup(r.id === 5 ? '无尽结算' : b.result === 'victory' ? '挑战胜利' : '挑战失败', "<p class=\"pool-name\">" + DUNGEONS[r.id].name + " \xB7 " + DIFFICULTIES[r.difficulty] + "</p><p class=\"result-line\">\u901A\u5173 <em>" + p.cleared + "</em> " + (r.id === 5 ? '关' : '波') + " \xB7 \u7528\u65F6 " + Math.floor(b.elapsed) + "\u79D2</p>" + this.section('获得奖励') + this.rewardViewport(this.reward(6, p.gold, '金币', 4) + this.reward(7, p.experience, '每位英雄经验') + this.reward(7, p.materials, '强化石') + (p.gear ? this.reward(0, p.gear, '装备', 3) : '')) + this.section('战斗统计') + b.formation.map(function (id) {
            return _this35.row(NAMES[id], '伤害 ' + b.heroes[id].damage + ' / 治疗 ' + b.heroes[id].healing, ROLE_ICONS[id]);
          }).join(''), this.button('退出', function () {
            _this35.close();
            _this35.port.exit();
            _this35.draw();
          }, 'peach') + this.button('再次挑战', function () {
            _this35.close();
            _this35.port.retry();
            _this35.lastReceipt = '';
            _this35.draw();
          }), 'large');
        };
        _proto.destroy = function destroy() {
          var _document$getElementB;
          this.root.remove();
          this.backdrop.remove();
          (_document$getElementB = document.getElementById('second-edition-style')) == null || _document$getElementB.remove();
          document.removeEventListener('keydown', this.onKey);
          clearTimeout(this.toastTimer);
        };
        _createClass(SecondEditionUI, [{
          key: "blocksBattle",
          get: function get() {
            return this.inSecondary || this.modal.childElementCount > 0;
          }
        }]);
        return SecondEditionUI;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SquadBattleModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './V2Progress.ts'], function (exports) {
  var _extends, _createForOfIteratorHelperLoose, _createClass, cclegacy, V2_CONFIG, initialV2, treeBonuses, TREE_NODES, FORMATIONS, validV2;
  return {
    setters: [function (module) {
      _extends = module.extends;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      V2_CONFIG = module.V2_CONFIG;
      initialV2 = module.initialV2;
      treeBonuses = module.treeBonuses;
      TREE_NODES = module.TREE_NODES;
      FORMATIONS = module.FORMATIONS;
      validV2 = module.validV2;
    }],
    execute: function () {
      exports({
        dungeonReward: dungeonReward,
        gearUpgradePreview: gearUpgradePreview,
        generateGear: generateGear,
        initialRecruit: initialRecruit,
        recoverDungeon: recoverDungeon,
        recruit: recruit,
        validDungeon: validDungeon,
        validRecruit: validRecruit
      });
      cclegacy._RF.push({}, "a1c3d74NqVMjKfEyIXfrvDZ", "SquadBattleModel", undefined);
      // Dungeon values are test tuning; all clocks use milliseconds and the local calendar.
      var DUNGEON_CONFIG = exports('DUNGEON_CONFIG', {
        staminaCap: 120,
        recoverMs: 6 * 60 * 1000,
        dailyLimit: 2,
        costs: [10, 15, 20],
        scales: [1, 1.7, 2.6],
        mobWaves: 10
      });
      var DUNGEONS = exports('DUNGEONS', [{
        name: '金币宝库',
        drop: '金币产出',
        kind: 0
      }, {
        name: '历练营地',
        drop: '英雄经验',
        kind: 3
      }, {
        name: '锻造矿洞',
        drop: '强化材料',
        kind: 2
      }, {
        name: '遗落秘境',
        drop: '装备掉落',
        kind: 1
      }, {
        name: '蘑菇守卫战',
        drop: '金币 · 经验 · 强化材料',
        kind: 1
      }, {
        name: '无尽之塔',
        drop: '无限关卡 · 阵亡后结算',
        kind: 0
      }]);
      var DIFFICULTIES = exports('DIFFICULTIES', ['普通', '困难', '噩梦']);
      var initialDungeon = exports('initialDungeon', function initialDungeon() {
        return {
          stamina: 120,
          anchor: 0,
          clock: 0,
          day: 0,
          dailyUsed: 0,
          floor: 1,
          run: null
        };
      });
      var localDay = exports('localDay', function localDay(ms) {
        var d = new Date(ms);
        return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
      });
      function recoverDungeon(p, now) {
        if (!Number.isSafeInteger(now) || now <= 0) return;
        now = Math.max(now, p.clock);
        p.clock = now;
        var day = localDay(now);
        if (day > p.day) {
          p.day = day;
          p.dailyUsed = 0;
        }
        if (!p.anchor) {
          p.anchor = now;
          return;
        }
        if (p.stamina >= DUNGEON_CONFIG.staminaCap) {
          p.anchor = now;
          return;
        }
        var recovered = Math.floor((now - p.anchor) / DUNGEON_CONFIG.recoverMs);
        if (recovered > 0) {
          p.stamina = Math.min(DUNGEON_CONFIG.staminaCap, p.stamina + recovered);
          p.anchor = p.stamina === DUNGEON_CONFIG.staminaCap ? now : p.anchor + recovered * DUNGEON_CONFIG.recoverMs;
        }
      }
      function validDungeon(p) {
        var _int = function _int(v, max) {
          if (max === void 0) {
            max = 1e15;
          }
          return Number.isSafeInteger(v) && v >= 0 && v <= max;
        };
        if (!p || !_int(p.stamina, 120) || !_int(p.anchor) || !_int(p.clock) || p.anchor > p.clock || !_int(p.day, 99991231) || !_int(p.dailyUsed, 2) || !_int(p.floor, 1e12) || p.floor < 1) return false;
        var r = p.run;
        return r === null || !!r && _int(r.id, 5) && _int(r.difficulty, 2) && _int(r.floor, 1e12) && r.floor >= 1 && !!r.battle && r.battle.version === 9 && r.battle.continuous === false && r.battle.count === 3 && (!r.receipt || ['gold', 'experience', 'materials', 'gear', 'salvaged', 'cleared'].every(function (k) {
          return _int(r.receipt[k]);
        }) && r.battle.result !== 'fighting' && r.receipt.cleared === r.battle.clearedWaves);
      }
      function dungeonReward(id, difficulty, floor) {
        if (floor === void 0) {
          floor = 1;
        }
        var scale = difficulty + 1,
          layer = id === 5 ? floor : 1;
        return {
          gold: ([3000, 0, 0, 0, 1500, 500][id] || 0) * scale * layer,
          experience: ([0, 1200, 0, 0, 600, 100][id] || 0) * scale * layer,
          materials: ([0, 0, 30, 0, 15, 5][id] || 0) * scale,
          gear: id === 3 ? scale : 0,
          level: Math.min(100, 12 + difficulty * 6)
        };
      }
      var RECRUIT_CONFIG = exports('RECRUIT_CONFIG', {
        initialTickets: 60,
        epicPity: 10,
        legendPity: 30,
        legendRate: .05,
        epicRate: .2,
        upMageRate: .5
      });
      var RECRUIT_HEROES = exports('RECRUIT_HEROES', ['骑士', '法师', '牧师', '弓箭手']);
      function initialRecruit() {
        return {
          tickets: RECRUIT_CONFIG.initialTickets,
          counts: [1, 1, 1, 0],
          pity: [{
            epic: 0,
            legend: 0,
            total: 0
          }, {
            epic: 0,
            legend: 0,
            total: 0
          }],
          history: [],
          last: []
        };
      }
      function validRecruit(r) {
        var integer = function integer(v, max) {
          if (max === void 0) {
            max = 1e9;
          }
          return Number.isInteger(v) && v >= 0 && v <= max;
        };
        if (!r || !integer(r.tickets) || !Array.isArray(r.counts) || r.counts.length !== 4 || !r.counts.every(function (n) {
          return integer(n);
        }) || r.counts.slice(0, 3).some(function (n) {
          return n < 1;
        }) || !Array.isArray(r.pity) || r.pity.length !== 2 || !r.pity.every(function (p) {
          return p && integer(p.epic, 9) && integer(p.legend, 29) && integer(p.total);
        })) return false;
        var total = r.pity[0].total + r.pity[1].total;
        var valid = function valid(a) {
          return Array.isArray(a) && a.every(function (x, i) {
            return x && integer(x.id, total) && x.id > 0 && integer(x.pool, 1) && integer(x.hero, 3) && integer(x.rarity, 2) && typeof x.fresh === 'boolean' && (i === 0 || x.id > a[i - 1].id);
          });
        };
        return valid(r.history) && r.history.length === Math.min(total, 100) && valid(r.last) && (total === 0 ? r.last.length === 0 : [1, 10].indexOf(r.last.length) >= 0) && JSON.stringify(r.last) === JSON.stringify(r.history.slice(-r.last.length || r.history.length)) && r.counts.reduce(function (a, b) {
          return a + b;
        }, 0) === total + 3;
      }
      function recruit(state, pool, n, random) {
        if (random === void 0) {
          random = Math.random;
        }
        if ([0, 1].indexOf(pool) < 0 || [1, 10].indexOf(n) < 0) return '无效的招募请求';
        if (state.tickets < n) return '招募券不足，需要' + n + '张，当前' + state.tickets + '张';
        var next = JSON.parse(JSON.stringify(state)),
          p = next.pity[pool];
        next.last = [];
        var roll = function roll() {
          var v = random();
          if (!Number.isFinite(v) || v < 0 || v >= 1) throw Error('invalid random');
          return v;
        };
        try {
          for (var i = 0; i < n; i++) {
            var r = roll();
            var rarity = p.legend + 1 >= RECRUIT_CONFIG.legendPity || r < RECRUIT_CONFIG.legendRate ? 2 : p.epic + 1 >= RECRUIT_CONFIG.epicPity || r < RECRUIT_CONFIG.legendRate + RECRUIT_CONFIG.epicRate ? 1 : 0;
            var hero = pool === 1 && rarity === 2 ? 1 : pool === 1 && roll() < RECRUIT_CONFIG.upMageRate ? 1 : Math.floor(roll() * 4);
            var result = {
              id: next.pity[0].total + next.pity[1].total + 1,
              pool: pool,
              hero: hero,
              rarity: rarity,
              fresh: next.counts[hero] === 0
            };
            next.counts[hero]++;
            p.total++;
            p.epic = rarity >= 1 ? 0 : p.epic + 1;
            p.legend = rarity === 2 ? 0 : p.legend + 1;
            next.last.push(result);
            next.history.push(result);
          }
        } catch (_unused) {
          return '招募随机数据异常，未扣券';
        }
        next.tickets -= n;
        next.history = next.history.slice(-100);
        Object.assign(state, next);
        return null;
      }

      // Temporary roster tuning, not final progression values.
      var HERO_CONFIG = exports('HERO_CONFIG', [{
        name: '骑士',
        hp: 1980,
        attack: 128,
        speed: 100,
        skill: '守护',
        cooldown: 8,
        power: 220
      }, {
        name: '法师',
        hp: 1120,
        attack: 145,
        speed: 110,
        skill: '火焰',
        cooldown: 7,
        power: 290
      }, {
        name: '牧师',
        hp: 1260,
        attack: 75,
        speed: 95,
        skill: '治愈',
        cooldown: 9,
        power: 240
      }, {
        name: '弓箭手',
        hp: 1180,
        attack: 152,
        speed: 120,
        skill: '精准射击',
        cooldown: 7,
        power: 280
      }]);
      // Test tuning: active, passive, active, passive.
      var SKILL_LEVELS = exports('SKILL_LEVELS', [1, 3, 5, 8]);
      var SKILL_NAMES = exports('SKILL_NAMES', [['守护', '坚韧', '盾击', '守护精通'], ['火焰', '奥术专注', '炎爆', '烈焰精通'], ['治愈', '虔诚', '强效治疗', '治愈精通'], ['精准射击', '猎手', '穿心箭', '精准精通']]);
      var TALENTS = exports('TALENTS', [{
        name: '生命强化',
        max: 3,
        cost: 1,
        description: '每级最大生命 +10%'
      }, {
        name: '攻击强化',
        max: 3,
        cost: 1,
        description: '每级普攻攻击 +10%'
      }, {
        name: '技能强化',
        max: 3,
        cost: 1,
        description: '每级两个主动效果 +10%'
      }, {
        name: '技能流转',
        max: 1,
        cost: 2,
        description: '需技能强化1级；第二主动冷却12秒→8秒'
      }]);
      var SECOND_COOLDOWN = exports('SECOND_COOLDOWN', 12);
      var EQUIPMENT_PARTS = exports('EQUIPMENT_PARTS', ['武器', '戒指', '项链', '头盔', '衣服', '鞋子']);
      var QUALITY_NAMES = exports('QUALITY_NAMES', ['普通', '优秀', '稀有', '史诗', '传说']);
      var OFFLINE_CONFIG = exports('OFFLINE_CONFIG', {
        capSeconds: 8 * 60 * 60,
        tickSeconds: 5,
        goldPerTick: 10,
        experiencePerTick: 8,
        gearSeconds: 30
      });
      var DROP_SECONDS = exports('DROP_SECONDS', 30);
      // Runtime resume/stall gaps are not offline reward time. Model tests may still settle explicit durations.
      var foregroundRewardDelta = exports('foregroundRewardDelta', function foregroundRewardDelta(seconds) {
        return Number.isFinite(seconds) && seconds > 0 && seconds <= 60 ? seconds : 0;
      });
      var GEAR_ART = exports('GEAR_ART', [[0, 3], [1, 2], [2, 1], [3, 2], [4, 3], [5, 1], [0, 4], [0, 1], [2, 2], [0, 1], [3, 0], [4, 2], [0, 3], [1, 2], [2, 1], [3, 3], [4, 2], [5, 1]]);
      var validGearEffects = exports('validGearEffects', function validGearEffects(g) {
        return g.effects === undefined || Array.isArray(g.effects) && g.effects.length <= (g.quality === 4 ? 2 : g.quality === 3 ? 1 : 0) && new Set(g.effects).size === g.effects.length && g.effects.every(function (e) {
          return e === 'attack' || e === 'hp';
        });
      });
      var GEAR_ATTRIBUTE_NAMES = exports('GEAR_ATTRIBUTE_NAMES', {
        hp: '生命',
        attack: '攻击',
        defense: '防御',
        power: '技能效果'
      });
      var gearPrimary = exports('gearPrimary', function gearPrimary(g) {
        return ['attack', 'attack', 'power', 'defense', 'hp', 'hp'][g.slot];
      });
      function gearUpgradePreview(g) {
        var next = _extends({}, g, {
            level: Math.min(100, g.level + 1)
          }),
          primary = gearPrimary(g),
          breakthrough = g.level % 10 === 9;
        if (g.level >= 100) return next;
        for (var _iterator = _createForOfIteratorHelperLoose(['hp', 'attack', 'defense', 'power']), _step; !(_step = _iterator()).done;) {
          var key = _step.value;
          if (g[key] && (key === primary || breakthrough)) next[key] = Math.min(1e6, Math.ceil(g[key] * (key === primary ? 1.1 : 1.15)));
        }
        return next;
      }
      var ENHANCE_CAP = exports('ENHANCE_CAP', 10);
      var gearStats = exports('gearStats', function gearStats(g) {
        var scale = 10 + (g.enhancement || 0);
        return {
          hp: Math.ceil(g.hp * scale / 10),
          attack: Math.ceil(g.attack * scale / 10),
          defense: Math.ceil(g.defense * scale / 10),
          power: Math.ceil(g.power * scale / 10)
        };
      });
      var enhanceCost = exports('enhanceCost', function enhanceCost(g) {
        return (g.quality + 1) * 5 * ((g.enhancement || 0) + 1);
      });
      var investedMaterials = exports('investedMaterials', function investedMaterials(g) {
        return (g.quality + 1) * 5 * (g.enhancement || 0) * ((g.enhancement || 0) + 1) / 2;
      });
      var salvageValue = exports('salvageValue', function salvageValue(g) {
        return (g.quality + 1) * 3 + g.level + investedMaterials(g);
      });
      var gearScore = exports('gearScore', function gearScore(g) {
        var v = gearStats(g);
        return v.hp / 10 + v.attack * 2 + v.defense * 3 + v.power;
      });
      var gearName = exports('gearName', function gearName(g) {
        return QUALITY_NAMES[g.quality] + EQUIPMENT_PARTS[g.slot] + (g.enhancement ? ' +' + g.enhancement : '');
      });
      var gearDescription = exports('gearDescription', function gearDescription(g) {
        var v = gearStats(g);
        return [['生命', v.hp], ['攻击', v.attack], ['防御', v.defense], ['技能效果', v.power]].filter(function (x) {
          return Number(x[1]) > 0;
        }).map(function (x) {
          return x[0] + ' +' + x[1];
        }).join(' · ');
      });
      var validRules = exports('validRules', function validRules(r) {
        return !!r && typeof r.enabled === 'boolean' && Number.isInteger(r.minQuality) && r.minQuality >= 0 && r.minQuality <= 5 && Number.isInteger(r.minLevel) && r.minLevel >= 0 && r.minLevel <= 100 && Array.isArray(r.attributes) && r.attributes.length <= 4 && new Set(r.attributes).size === r.attributes.length && r.attributes.every(function (k) {
          return ['hp', 'attack', 'defense', 'power'].indexOf(k) >= 0;
        });
      });
      // Separate deterministic loot stream: frame size and combat RNG never affect drops.
      function generateGear(id, level) {
        var seed = id * 2654435761 >>> 0;
        var random = function random() {
          seed ^= seed << 13;
          seed ^= seed >>> 17;
          seed ^= seed << 5;
          return (seed >>> 0) / 4294967296;
        };
        var _GEAR_ART$Math$floor = GEAR_ART[Math.floor(random() * GEAR_ART.length)],
          slot = _GEAR_ART$Math$floor[0],
          quality = _GEAR_ART$Math$floor[1];
        var g = {
          id: id,
          slot: slot,
          quality: quality,
          level: level,
          hp: 0,
          attack: 0,
          defense: 0,
          power: 0,
          locked: false
        };
        var scale = (1 + (level - 1) * .12) * (1 + quality * .35);
        var main = ['attack', 'attack', 'power', 'defense', 'hp', 'hp'][slot];
        g[main] = Math.round({
          hp: 100,
          attack: 16,
          defense: 7,
          power: 22
        }[main] * scale);
        var secondary = ['hp', 'attack', 'defense', 'power'].filter(function (k) {
            return k !== main;
          }),
          key = secondary[Math.floor(random() * secondary.length)];
        g[key] = Math.round({
          hp: 40,
          attack: 6,
          defense: 3,
          power: 9
        }[key] * scale * (.8 + random() * .4));
        if (quality >= 3) {
          var count = Math.floor(random() * (quality === 4 ? 3 : 2));
          g.effects = count === 2 ? ['attack', 'hp'] : count === 1 ? [random() < .5 ? 'attack' : 'hp'] : [];
        }
        return g;
      }
      var STAR_CONFIG = exports('STAR_CONFIG', {
        cap: 5,
        costs: [1, 2, 3, 4],
        attributePerStar: .15,
        skillPerStar: .25
      });
      var starSpent = exports('starSpent', function starSpent(stars) {
        return STAR_CONFIG.costs.slice(0, stars - 1).reduce(function (a, b) {
          return a + b;
        }, 0);
      });
      var LEVEL_CAP = exports('LEVEL_CAP', 100);
      var upgradeCost = exports('upgradeCost', function upgradeCost(level) {
        return 40 * level;
      });
      var MONSTERS = exports('MONSTERS', [{
        name: '嫩叶史莱姆',
        hp: 2400,
        attack: 230
      }, {
        name: '橙帽蘑菇',
        hp: 2600,
        attack: 245
      }, {
        name: '圆壳蜗牛',
        hp: 2800,
        attack: 250
      }, {
        name: '芽芽树桩',
        hp: 3000,
        attack: 265
      }]);
      // Skills may override this independently of basic attacks. Current fire stays random.
      var FIRE_TARGET = exports('FIRE_TARGET', 'random');
      // Combat indices 0..2 are formation slots, not roster IDs; 3..5 are enemies.
      var SquadBattleModel = exports('SquadBattleModel', /*#__PURE__*/function () {
        var _proto = SquadBattleModel.prototype;
        _proto.refreshDungeon = function refreshDungeon(now) {
          recoverDungeon(this.dungeon, now);
        };
        _proto.startDungeon = function startDungeon(id, difficulty, now) {
          if (!Number.isInteger(id) || id < 0 || id >= DUNGEONS.length || !Number.isInteger(difficulty) || difficulty < 0 || difficulty > 2) return '无效的副本或难度';
          this.refreshDungeon(now);
          var p = this.dungeon;
          if (p.run) return '已有进行中的挑战，请先继续或结束';
          if (!p.clock) return '时间异常，请重试';
          if (id === 4 && p.dailyUsed >= DUNGEON_CONFIG.dailyLimit) return '今日挑战次数已用完，明日再来';
          var cost = DUNGEON_CONFIG.costs[difficulty];
          if (p.stamina < cost) return '体力不足，需要' + cost + '点';
          var battle = new SquadBattleModel(DUNGEONS[id].kind, Math.random, 3, false);
          battle.inheritIncome(this);
          battle.dungeon = initialDungeon();
          battle.offline = null;
          battle.paused = false;
          battle.encounter = {
            id: id,
            difficulty: difficulty,
            startFloor: 1
          };
          battle.wave = 1;
          battle.kills = 0;
          battle.clearedWaves = 0;
          battle.spawn();
          var snapshot = battle.snapshot();
          snapshot.version = 9;
          delete snapshot.dungeon;
          p.stamina -= cost;
          if (id === 4) p.dailyUsed++;
          p.run = {
            id: id,
            difficulty: difficulty,
            floor: p.floor,
            battle: snapshot
          };
          return null;
        }
        /** Receipt and balances are saved atomically; retaining the run keeps the result screen resumable. */;
        _proto.settleDungeon = function settleDungeon() {
          var _this = this;
          var p = this.dungeon,
            r = p.run;
          if (!r) return '没有进行中的挑战';
          if (r.receipt) return null;
          var battle = SquadBattleModel.restore(r.battle);
          if (!battle || battle.result === 'fighting') return '挑战尚未结束';
          var cleared = battle.clearedWaves;
          var reward = r.id === 5 ? {
            gold: 500 * (r.difficulty + 1) * cleared,
            experience: 100 * (r.difficulty + 1) * cleared,
            materials: 5 * (r.difficulty + 1) * cleared,
            gear: 0,
            level: 1
          } : battle.result === 'victory' ? dungeonReward(r.id, r.difficulty) : {
            gold: 0,
            experience: 0,
            materials: 0,
            gear: 0,
            level: 1
          };
          this.gold += reward.gold;
          this.heroes.forEach(function (h, i) {
            if (_this.owns(i)) h.experience += reward.experience;
          });
          var materials = this.materials;
          this.materials += reward.materials;
          var kept = 0,
            salvaged = 0;
          for (var _i = 0; _i < reward.gear; _i++) {
            var g = generateGear(this.nextGearId++, reward.level);
            this.inventory.push(g);
            if (this.inventory.length > this.interfaceProgress.capacity || this.rules.enabled && !this.retained(g)) {
              this.salvage([g.id]);
              this.autoSalvaged++;
              salvaged++;
            } else kept++;
          }
          if (r.id === 5) p.floor = Math.max(p.floor, cleared + 1);
          r.receipt = {
            gold: reward.gold,
            experience: reward.experience,
            materials: this.materials - materials,
            gear: kept,
            salvaged: salvaged,
            cleared: cleared
          };
          return null;
        };
        _proto.finishDungeon = function finishDungeon() {
          var r = this.dungeon.run;
          if (!r) return '没有进行中的挑战';
          if (r.battle.result !== 'victory') return '挑战尚未胜利';
          var error = this.settleDungeon();
          if (!error) this.dungeon.run = null;
          return error;
        };
        _proto.exitDungeon = function exitDungeon() {
          var _this$dungeon$run;
          if (!((_this$dungeon$run = this.dungeon.run) != null && _this$dungeon$run.receipt)) return '请先完成结算';
          this.dungeon.run = null;
          return null;
        };
        _proto.retryDungeon = function retryDungeon(now) {
          var r = this.dungeon.run;
          if (!(r != null && r.receipt)) return '请先完成结算';
          this.dungeon.run = null;
          var error = this.startDungeon(r.id, r.difficulty, now);
          if (error) this.dungeon.run = r;
          return error;
        };
        _proto.abandonDungeon = function abandonDungeon() {
          if (!this.dungeon.run) return '没有进行中的挑战';
          this.dungeon.run = null;
          return null;
        };
        _proto.markSeen = function markSeen(now) {
          if (Number.isFinite(now) && now > 0) this.lastSeen = Math.max(this.lastSeen, Math.floor(now));
        };
        _proto.prepareOffline = function prepareOffline(now) {
          var _this$offline,
            _this2 = this;
          if (!Number.isFinite(now) || now <= 0) return false;
          now = Math.floor(now);
          if (!this.lastSeen) {
            this.markSeen(now);
            return false;
          }
          var seconds = Math.min(OFFLINE_CONFIG.capSeconds - (((_this$offline = this.offline) == null ? void 0 : _this$offline.seconds) || 0), Math.max(0, Math.floor((now - this.lastSeen) / 1000)));
          this.markSeen(now);
          var ticks = Math.floor(seconds / OFFLINE_CONFIG.tickSeconds);
          if (!ticks) return false;
          var checkpoint = this.highestWave,
            scale = 1 + Math.floor((checkpoint - 1) / 5),
            earned = ticks * OFFLINE_CONFIG.tickSeconds;
          var reward = this.offline || {
            seconds: 0,
            gold: 0,
            experience: [0, 0, 0, 0],
            equipment: [],
            checkpoint: checkpoint
          };
          reward.seconds += earned;
          reward.gold += ticks * OFFLINE_CONFIG.goldPerTick * scale;
          reward.checkpoint = Math.max(reward.checkpoint, checkpoint);
          reward.experience = reward.experience.map(function (v, i) {
            return v + (_this2.owns(i) ? ticks * OFFLINE_CONFIG.experiencePerTick * scale : 0);
          });
          var drops = Math.floor(reward.seconds / OFFLINE_CONFIG.gearSeconds) - Math.floor((reward.seconds - earned) / OFFLINE_CONFIG.gearSeconds);
          for (var n = 0; n < drops; n++) reward.equipment.push(generateGear(this.nextGearId++, Math.min(100, 1 + Math.floor((checkpoint - 1) / 3))));
          this.offline = reward;
          return true;
        };
        _proto.claimOffline = function claimOffline() {
          var _this3 = this;
          var r = this.offline;
          if (!r) return '没有待领取收益';
          this.gold += r.gold;
          r.experience.forEach(function (v, i) {
            return _this3.heroes[i].experience += v;
          });
          for (var _iterator2 = _createForOfIteratorHelperLoose(r.equipment), _step2; !(_step2 = _iterator2()).done;) {
            var gear = _step2.value;
            this.inventory.push(_extends({}, gear));
            if (this.inventory.length > this.interfaceProgress.capacity || this.rules.enabled && !this.retained(gear)) {
              this.salvage([gear.id]);
              this.autoSalvaged++;
            }
          }
          this.offline = null;
          return null;
        };
        _proto.quickSweep = function quickSweep() {
          if (this.dungeon.stamina < V2_CONFIG.quickCost) return {
            error: '体力不足',
            reward: null
          };
          var pending = this.offline,
            seen = this.lastSeen,
            now = Math.max(Date.now(), seen);
          this.offline = null;
          this.lastSeen = now - V2_CONFIG.quickSeconds * 1000;
          this.prepareOffline(now);
          var reward = this.offline;
          this.claimOffline();
          this.offline = pending;
          this.lastSeen = seen;
          this.dungeon.stamina -= V2_CONFIG.quickCost;
          return {
            error: null,
            reward: reward
          };
        };
        _proto.owns = function owns(i) {
          return Number.isInteger(i) && i >= 0 && i < HERO_CONFIG.length && this.recruitment.counts[i] > 0;
        };
        _proto.battleStats = function battleStats(slot) {
          return this.stats(this.formation[slot]);
        };
        _proto.setFormation = function setFormation(ids) {
          var _this4 = this;
          if (!Array.isArray(ids) || ids.length < 1 || ids.length > 3 || new Set(ids).size !== ids.length || !ids.every(function (i) {
            return _this4.owns(i);
          })) return "请选择1至3位已招募且不重复的英雄";
          if (ids.join() === this.formation.join()) return null;
          this.formation = ids.slice();
          this.party.forEach(function (h, i) {
            h.hp = _this4.battleStats(i).hp;
            h.shield = 0;
            h.cooldown = 0;
            h.queued = false;
            h.cooldown2 = 0;
            h.queued2 = false;
          });
          this.result = "fighting";
          this.waveDelay = 0;
          this.regrouping = false;
          this.spawn();
          return null;
        };
        _proto.setBattleFormation = function setBattleFormation(ids) {
          var _this5 = this;
          if (this.result !== 'fighting') return '战斗已结束';
          if (!Array.isArray(ids) || ids.length < 1 || ids.length > 3 || new Set(ids).size !== ids.length || !ids.every(function (i) {
            return _this5.owns(i);
          })) return '请选择1至3位已招募且不重复的英雄';
          if (ids.every(function (i) {
            return _this5.heroes[i].hp <= 0;
          })) return '至少需要一位存活英雄';
          var next = this.order[this.cursor],
            hero = next < 3 ? this.formation[next] : -1;
          this.formation = ids.slice();
          this.buildOrder();
          var actor = next >= 3 ? next : this.formation.indexOf(hero);
          this.cursor = Math.max(0, this.order.indexOf(actor));
          return null;
        };
        _proto.buildOrder = function buildOrder() {
          var _this6 = this;
          this.order = [].concat(this.formation.map(function (_, i) {
            return i;
          }).sort(function (a, b) {
            return _this6.battleStats(b).speed - _this6.battleStats(a).speed;
          }), this.enemies.map(function (_, i) {
            return i + 3;
          }));
        };
        function SquadBattleModel(monsterIndex, random, count, continuous) {
          if (monsterIndex === void 0) {
            monsterIndex = 0;
          }
          if (random === void 0) {
            random = Math.random;
          }
          if (count === void 0) {
            count = 1;
          }
          if (continuous === void 0) {
            continuous = false;
          }
          this.encounter = null;
          this.interfaceProgress = initialV2();
          this.dungeon = initialDungeon();
          this.lastSeen = 0;
          this.offline = null;
          this.materials = 0;
          this.autoSalvaged = 0;
          this.rules = {
            enabled: false,
            minQuality: 2,
            minLevel: 0,
            attributes: []
          };
          this.recruitment = initialRecruit();
          this.formation = [0, 1, 2];
          this.inventory = [];
          this.loadouts = Array.from({
            length: 4
          }, function () {
            return Array(6).fill(null);
          });
          this.nextGearId = 1;
          this.dropRemainder = 0;
          this.highestWave = 1;
          this.heroes = HERO_CONFIG.map(function (c) {
            return {
              hp: c.hp,
              shield: 0,
              cooldown: 0,
              queued: false,
              cooldown2: 0,
              queued2: false,
              damage: 0,
              healing: 0,
              experience: 0,
              level: 1,
              stars: 1,
              talents: [0, 0, 0, 0]
            };
          });
          this.enemies = [];
          this.elapsed = 0;
          this.actions = 0;
          this.damage = 0;
          this.received = 0;
          this.autoSkill = true;
          this.paused = false;
          this.idleElapsed = 0;
          this.incomeRemainder = 0;
          this.wave = 1;
          this.kills = 0;
          this.gold = 0;
          this.clearedWaves = 0;
          this.waveDelay = 0;
          this.regrouping = false;
          this.result = 'fighting';
          this.order = [];
          this.cursor = 0;
          this.timer = 0;
          this.monsterIndex = void 0;
          this.random = void 0;
          this.count = void 0;
          this.continuous = void 0;
          this.monsterIndex = monsterIndex;
          this.random = random;
          this.count = Math.max(1, Math.min(3, count));
          this.continuous = continuous;
          this.spawn();
        }
        _proto.equipment = function equipment(i) {
          var _this7 = this;
          return this.loadouts[i].map(function (id) {
            return _this7.inventory.find(function (g) {
              return g.id === id;
            }) || null;
          });
        };
        _proto.owner = function owner(id) {
          return this.loadouts.findIndex(function (slots) {
            return slots.indexOf(id) >= 0;
          });
        };
        _proto.stats = function stats(i, stars) {
          if (stars === void 0) {
            stars = this.heroes[i].stars;
          }
          var tree = treeBonuses(this.interfaceProgress, i),
            base = HERO_CONFIG[i],
            scale = 1 + (this.heroes[i].level - 1) * .1,
            attr = 1 + (stars - 1) * STAR_CONFIG.attributePerStar,
            skill = 1 + (stars - 1) * STAR_CONFIG.skillPerStar,
            gear = this.equipment(i);
          var effect = function effect(key) {
            return 1 + gear.reduce(function (n, g) {
              return n + (g != null && g.effects && g.effects.indexOf(key) >= 0 ? 1 : 0);
            }, 0) * .05;
          };
          var sum = function sum(key) {
            return gear.reduce(function (n, g) {
              return n + (g ? gearStats(g)[key] : 0);
            }, 0);
          };
          return _extends({}, base, {
            hp: Math.round((base.hp * scale * attr + sum('hp')) * (1 + this.heroes[i].talents[0] * .1 + tree.hp) * effect('hp')),
            attack: Math.round((base.attack * scale * attr + sum('attack')) * (this.unlocked(i, 1) && i === 3 ? 1.15 : 1) * (1 + this.heroes[i].talents[1] * .1 + tree.attack) * effect('attack')),
            defense: tree.defense + sum('defense') + (this.unlocked(i, 1) && i === 0 ? 25 : 0),
            power: Math.round((base.power * scale * skill + sum('power')) * (this.unlocked(i, 1) && (i === 1 || i === 2) ? 1.15 : 1) * (this.unlocked(i, 3) ? 1.2 : 1) * (1 + this.heroes[i].talents[2] * .1 + tree.power))
          });
        };
        _proto.talentPoints = function talentPoints(i) {
          return this.owns(i) ? this.heroes[i].level - 1 - this.interfaceProgress.tree[i].reduce(function (n, r) {
            return n + r;
          }, 0) - this.heroes[i].talents.reduce(function (n, r, j) {
            return n + r * TALENTS[j].cost;
          }, 0) : 0;
        };
        _proto.secondCooldown = function secondCooldown(i) {
          return (this.heroes[i].talents[3] ? 8 : SECOND_COOLDOWN) - treeBonuses(this.interfaceProgress, i).cooldown;
        };
        _proto.trainTreeTalent = function trainTreeTalent(i, node) {
          if (!this.owns(i) || !Number.isInteger(node) || node < 0 || node >= 15) return '无效的天赋节点';
          var t = this.interfaceProgress.tree[i],
            c = TREE_NODES[node];
          if (t[node]) return '节点已学习';
          if (c.parent >= 0 && !t[c.parent]) return '请先学习前置节点';
          if (this.talentPoints(i) < c.cost) return '天赋点不足';
          var h = this.heroes[i],
            ratio = h.hp / this.stats(i).hp;
          t[node] = 1;
          h.hp = h.hp > 0 ? Math.max(1, Math.round(this.stats(i).hp * ratio)) : 0;
          return null;
        };
        _proto.resetTreeTalents = function resetTreeTalents(i) {
          if (!this.owns(i)) return '请先招募该英雄';
          var h = this.heroes[i],
            ratio = h.hp / this.stats(i).hp;
          this.interfaceProgress.tree[i] = Array(15).fill(0);
          h.talents = [0, 0, 0, 0];
          h.hp = h.hp > 0 ? Math.max(1, Math.round(this.stats(i).hp * ratio)) : 0;
          h.shield = Math.min(h.shield, this.stats(i).power);
          return null;
        };
        _proto.trainTalent = function trainTalent(i, node) {
          if (!this.owns(i)) return '请先招募该英雄';
          if (!Number.isInteger(node) || node < 0 || node >= TALENTS.length) return '无效天赋';
          var h = this.heroes[i],
            c = TALENTS[node];
          if (h.talents[node] >= c.max) return '天赋已满级';
          if (node === 3 && !h.talents[2]) return '需要技能强化1级';
          if (this.talentPoints(i) < c.cost) return '天赋点不足';
          var ratio = h.hp / this.stats(i).hp;
          h.talents[node]++;
          h.hp = h.hp > 0 ? Math.max(1, Math.floor(this.stats(i).hp * ratio)) : 0;
          return null;
        };
        _proto.resetTalents = function resetTalents(i) {
          if (!this.owns(i)) return '请先招募该英雄';
          var h = this.heroes[i],
            ratio = h.hp / this.stats(i).hp;
          h.talents = [0, 0, 0, 0];
          h.hp = h.hp > 0 ? Math.max(1, Math.floor(this.stats(i).hp * ratio)) : 0;
          h.shield = Math.min(h.shield, this.stats(i).power);
          return null;
        };
        _proto.spareCopies = function spareCopies(i) {
          return this.owns(i) ? Math.max(0, this.recruitment.counts[i] - 1 - starSpent(this.heroes[i].stars)) : 0;
        };
        _proto.starPreview = function starPreview(i) {
          if (!this.owns(i)) return null;
          var stars = this.heroes[i].stars;
          return {
            stars: stars,
            cost: stars < STAR_CONFIG.cap ? STAR_CONFIG.costs[stars - 1] : 0,
            available: this.spareCopies(i),
            before: this.stats(i),
            after: this.stats(i, Math.min(STAR_CONFIG.cap, stars + 1))
          };
        };
        _proto.starUp = function starUp(i) {
          var p = this.starPreview(i);
          if (!p) return '请先招募该英雄';
          if (p.stars >= STAR_CONFIG.cap) return '已达到5星上限';
          if (p.available < p.cost) return '重复份数不足：需要' + p.cost + '份，当前' + p.available + '份';
          var h = this.heroes[i],
            ratio = h.hp / p.before.hp;
          h.stars++;
          h.hp = h.hp > 0 ? Math.max(1, Math.floor(this.stats(i).hp * ratio)) : 0;
          return null;
        };
        _proto.changeEquipment = function changeEquipment(i, slots) {
          var _this8 = this;
          if (slots.every(function (id, j) {
            return id === _this8.loadouts[i][j];
          })) return;
          var h = this.heroes[i],
            ratio = h.hp / this.stats(i).hp;
          this.loadouts[i] = slots;
          h.hp = h.hp > 0 ? Math.max(1, Math.floor(this.stats(i).hp * ratio)) : 0;
          h.shield = Math.min(h.shield, this.stats(i).power);
        };
        _proto.equip = function equip(i, id, slot) {
          if (!this.owns(i)) return '该英雄尚未招募';
          if (!Number.isInteger(slot) || slot < 0 || slot >= 6) return '无效装备部位';
          if (id !== null) {
            var g = this.inventory.find(function (g) {
              return g.id === id;
            });
            if (!g || g.slot !== slot) return '装备不存在或部位不匹配';
            var owner = this.owner(id);
            if (owner >= 0 && owner !== i) return '该装备已被' + HERO_CONFIG[owner].name + '穿戴，请先卸下';
          }
          var slots = this.loadouts[i].slice();
          slots[slot] = id;
          this.changeEquipment(i, slots);
          return null;
        };
        _proto.autoEquip = function autoEquip(i) {
          var _this9 = this;
          if (!this.owns(i)) return '该英雄尚未招募';
          var slots = this.loadouts[i].slice();
          var _loop = function _loop(slot) {
            var _best$id, _best;
            var best = _this9.inventory.find(function (g) {
              return g.id === slots[slot];
            });
            for (var _iterator3 = _createForOfIteratorHelperLoose(_this9.inventory), _step3; !(_step3 = _iterator3()).done;) {
              var g = _step3.value;
              if (g.slot !== slot || _this9.owner(g.id) >= 0 && _this9.owner(g.id) !== i) continue;
              if (!best || gearScore(g) > gearScore(best)) best = g;
            }
            slots[slot] = (_best$id = (_best = best) == null ? void 0 : _best.id) != null ? _best$id : null;
          };
          for (var slot = 0; slot < 6; slot++) {
            _loop(slot);
          }
          this.changeEquipment(i, slots);
          return null;
        };
        _proto.toggleLock = function toggleLock(id) {
          var g = this.inventory.find(function (g) {
            return g.id === id;
          });
          if (!g) return '装备不存在';
          g.locked = !g.locked;
          return null;
        };
        _proto.retained = function retained(g) {
          return g.locked || this.owner(g.id) >= 0 || (g.enhancement || 0) > 0 || g.quality >= this.rules.minQuality || this.rules.minLevel > 0 && g.level >= this.rules.minLevel || this.rules.attributes.some(function (key) {
            return g[key] > 0;
          });
        };
        _proto.setRules = function setRules(r) {
          if (!validRules(r)) return '保留规则无效';
          this.rules = _extends({}, r, {
            attributes: r.attributes.slice()
          });
          return null;
        };
        _proto.salvagePreview = function salvagePreview(ids) {
          var _this10 = this;
          var items = [];
          var error = null;
          if (!Array.isArray(ids) || !ids.length || new Set(ids).size !== ids.length) error = '请选择不重复的装备';else {
            var _loop2 = function _loop2() {
                var id = _step4.value;
                var g = _this10.inventory.find(function (g) {
                  return g.id === id;
                });
                if (!g) {
                  error = '装备已不存在，请重新选择';
                  return 0; // break
                }

                if (g.locked || _this10.owner(id) >= 0) {
                  error = '锁定或已穿戴装备不能分解';
                  return 0; // break
                }

                items.push(g);
              },
              _ret;
            for (var _iterator4 = _createForOfIteratorHelperLoose(ids), _step4; !(_step4 = _iterator4()).done;) {
              _ret = _loop2();
              if (_ret === 0) break;
            }
          }
          return {
            items: items,
            error: error,
            materials: error ? 0 : items.reduce(function (sum, g) {
              return sum + salvageValue(g);
            }, 0)
          };
        };
        _proto.salvage = function salvage(ids) {
          var preview = this.salvagePreview(ids);
          if (preview.error) return preview.error;
          var removed = new Set(ids);
          this.inventory = this.inventory.filter(function (g) {
            return !removed.has(g.id);
          });
          this.materials += preview.materials;
          return null;
        };
        _proto.enhance = function enhance(id) {
          var g = this.inventory.find(function (g) {
            return g.id === id;
          });
          if (!g) return '装备不存在';
          if ((g.enhancement || 0) >= ENHANCE_CAP) return '装备已达到强化上限';
          var cost = enhanceCost(g);
          if (this.materials < cost) return '强化石不足：需要' + cost + '，当前' + this.materials;
          var owner = this.owner(id),
            h = owner >= 0 ? this.heroes[owner] : null,
            ratio = h ? h.hp / this.stats(owner).hp : 0;
          this.materials -= cost;
          g.enhancement = (g.enhancement || 0) + 1;
          if (h) h.hp = h.hp > 0 ? Math.max(1, Math.floor(this.stats(owner).hp * ratio)) : 0;
          return null;
        };
        _proto.recruitPool = function recruitPool(pool, n) {
          if (pool === 0) return recruit(this.recruitment, pool, n);
          var old = this.recruitment.tickets;
          this.recruitment.tickets = this.interfaceProgress.upTickets;
          var error = recruit(this.recruitment, pool, n);
          this.interfaceProgress.upTickets = this.recruitment.tickets;
          this.recruitment.tickets = old;
          return error;
        };
        _proto.expandBag = function expandBag() {
          var p = this.interfaceProgress,
            cost = V2_CONFIG.capacityCost * Math.max(1, 1 + Math.floor((p.capacity - 200) / 50));
          if (p.capacity >= 1e6) return '容量已达上限';
          if (this.gold < cost) return '金币不足';
          this.gold -= cost;
          p.capacity = Math.min(1e6, p.capacity + 50);
          return null;
        };
        _proto.upgradeGear = function upgradeGear(id) {
          var g = this.inventory.find(function (g) {
            return g.id === id;
          });
          if (!g) return '装备不存在';
          if (g.level >= 100) return '已达等级上限';
          var breakthrough = g.level % 10 === 9,
            material = (g.quality + 1) * (breakthrough ? 15 : 4),
            gold = g.level * (breakthrough ? 100 : 30);
          if (this.materials < material || this.gold < gold) return '材料或金币不足';
          var owner = this.owner(id),
            h = owner >= 0 ? this.heroes[owner] : null,
            ratio = h ? h.hp / this.stats(owner).hp : 0;
          this.materials -= material;
          this.gold -= gold;
          Object.assign(g, gearUpgradePreview(g));
          if (h) h.hp = h.hp > 0 ? Math.max(1, Math.floor(this.stats(owner).hp * ratio)) : 0;
          return null;
        };
        _proto.upgrade = function upgrade(i) {
          var h = this.heroes[i];
          if (!this.owns(i)) return '该英雄尚未招募';
          if (h.level >= LEVEL_CAP) return '已达到当前等级上限';
          var cost = upgradeCost(h.level);
          if (h.experience < cost) return '经验不足，需要' + cost + '经验，当前' + h.experience;
          var ratio = h.hp / this.stats(i).hp;
          h.experience -= cost;
          h.level++;
          h.hp = h.hp > 0 ? Math.ceil(this.stats(i).hp * ratio) : 0;
          return null;
        };
        _proto.spawn = function spawn() {
          var _this11 = this;
          this.enemies = Array.from({
            length: this.count
          }, function (_, i) {
            var kind = (_this11.monsterIndex + _this11.wave - 1 + i) % 4,
              c = MONSTERS[kind];
            // Group trial uses lighter regular monsters; stable difficulty for the idle loop.
            return {
              kind: kind,
              hp: _this11.count > 1 ? Math.round(c.hp * .45) : c.hp,
              maxHp: _this11.count > 1 ? Math.round(c.hp * .45) : c.hp,
              attack: _this11.count > 1 ? Math.round(c.attack * .30) : c.attack
            };
          });
          if (this.encounter) {
            var c = this.encounter,
              scale = DUNGEON_CONFIG.scales[c.difficulty] * (c.id === 5 ? 1 + (this.wave - 1) * .15 : 1),
              boss = c.id !== 5 && this.wave === DUNGEON_CONFIG.mobWaves + 1;
            this.enemies.forEach(function (e, i) {
              var boost = boss && i === 0 ? 3 : 1;
              e.hp = e.maxHp = Math.min(1000000, Math.round(e.maxHp * scale * boost));
              e.attack = Math.min(100000, Math.round(e.attack * scale * (boss && i === 0 ? 1.6 : 1)));
            });
          }
          this.highestWave = Math.max(this.highestWave, this.wave);
          this.buildOrder();
          this.cursor = 0;
          this.timer = 0;
        };
        _proto.alive = function alive(id) {
          return id < 3 ? !!this.party[id] && this.party[id].hp > 0 : this.enemies[id - 3].hp > 0;
        };
        _proto.unlocked = function unlocked(id, slot) {
          return this.owns(id) && Number.isInteger(slot) && slot >= 0 && slot < 4 && this.heroes[id].level >= SKILL_LEVELS[slot];
        };
        _proto.requestSkill = function requestSkill(i, which) {
          if (which === void 0) {
            which = 0;
          }
          var h = this.party[i];
          if (!h || [0, 1].indexOf(which) < 0 || !this.unlocked(this.formation[i], which * 2) || h.hp <= 0 || (which ? h.cooldown2 : h.cooldown) > 0 || (which ? h.queued2 : h.queued) || this.result !== 'fighting' || this.waveDelay > 0) return false;
          if (which) h.queued2 = true;else h.queued = true;
          return true;
        };
        _proto.selectEnemy = function selectEnemy(rule) {
          var _this12 = this;
          if (rule === void 0) {
            rule = 'random';
          }
          var alive = this.enemies.map(function (_, i) {
            return i;
          }).filter(function (i) {
            return _this12.enemies[i].hp > 0;
          });
          if (!alive.length) return -1;
          if (typeof rule === 'object' && alive.indexOf(rule.preferred - 3) >= 0) return rule.preferred;
          if (rule === 'lowest-hp-ratio') {
            var score = Math.min.apply(Math, alive.map(function (i) {
              return _this12.enemies[i].hp / _this12.enemies[i].maxHp;
            }));
            var tied = alive.filter(function (i) {
              return _this12.enemies[i].hp / _this12.enemies[i].maxHp === score;
            });
            return 3 + tied[Math.min(tied.length - 1, Math.floor(this.random() * tied.length))];
          }
          if (rule === 'highest-attack') {
            var _score = Math.max.apply(Math, alive.map(function (i) {
              return _this12.enemies[i].attack;
            }));
            var _tied = alive.filter(function (i) {
              return _this12.enemies[i].attack === _score;
            });
            return 3 + _tied[Math.min(_tied.length - 1, Math.floor(this.random() * _tied.length))];
          }
          return 3 + alive[Math.min(alive.length - 1, Math.floor(this.random() * alive.length))];
        };
        _proto.patient = function patient() {
          var _this13 = this;
          return this.party.map(function (_, i) {
            return i;
          }).filter(function (i) {
            return _this13.party[i].hp > 0 && _this13.party[i].hp < _this13.battleStats(i).hp;
          }).sort(function (a, b) {
            return _this13.party[a].hp / _this13.battleStats(a).hp - _this13.party[b].hp / _this13.battleStats(b).hp;
          })[0];
        };
        _proto.target = function target() {
          var _this14 = this;
          var alive = this.party.map(function (_, i) {
            return i;
          }).filter(function (i) {
            return _this14.party[i].hp > 0;
          });
          var total = alive.reduce(function (s, i) {
            return s + (FORMATIONS[_this14.interfaceProgress.formation].rates[i] || 1);
          }, 0);
          var roll = this.random() * total;
          for (var _iterator5 = _createForOfIteratorHelperLoose(alive), _step5; !(_step5 = _iterator5()).done;) {
            var _i2 = _step5.value;
            roll -= FORMATIONS[this.interfaceProgress.formation].rates[_i2] || 1;
            if (roll < 0) return _i2;
          }
          return alive[alive.length - 1];
        };
        _proto.inheritIncome = function inheritIncome(previous) {
          var _this15 = this;
          this.interfaceProgress = JSON.parse(JSON.stringify(previous.interfaceProgress));
          this.dungeon = JSON.parse(JSON.stringify(previous.dungeon));
          this.lastSeen = previous.lastSeen;
          this.offline = previous.offline ? JSON.parse(JSON.stringify(previous.offline)) : null;
          this.formation = previous.formation.slice();
          this.buildOrder();
          this.materials = previous.materials;
          this.autoSalvaged = previous.autoSalvaged;
          this.rules = _extends({}, previous.rules, {
            attributes: previous.rules.attributes.slice()
          });
          this.recruitment = JSON.parse(JSON.stringify(previous.recruitment));
          this.inventory = previous.inventory.map(function (g) {
            return _extends({}, g);
          });
          this.loadouts = previous.loadouts.map(function (s) {
            return s.slice();
          });
          this.nextGearId = previous.nextGearId;
          this.dropRemainder = previous.dropRemainder;
          this.highestWave = previous.highestWave;
          this.gold = previous.gold;
          this.kills = previous.kills;
          this.idleElapsed = previous.idleElapsed;
          this.incomeRemainder = previous.incomeRemainder;
          this.heroes.forEach(function (h, i) {
            h.experience = previous.heroes[i].experience;
            h.level = previous.heroes[i].level;
            h.stars = previous.heroes[i].stars;
            h.talents = previous.heroes[i].talents.slice();
            h.hp = _this15.stats(i).hp;
          });
        };
        _proto.snapshot = function snapshot() {
          return {
            version: 11,
            interfaceProgress: JSON.parse(JSON.stringify(this.interfaceProgress)),
            encounter: this.encounter ? _extends({}, this.encounter) : null,
            dungeon: JSON.parse(JSON.stringify(this.dungeon)),
            lastSeen: this.lastSeen,
            offline: this.offline ? JSON.parse(JSON.stringify(this.offline)) : null,
            formation: this.formation.slice(),
            recruitment: JSON.parse(JSON.stringify(this.recruitment)),
            materials: this.materials,
            autoSalvaged: this.autoSalvaged,
            rules: _extends({}, this.rules, {
              attributes: this.rules.attributes.slice()
            }),
            inventory: this.inventory.map(function (g) {
              return _extends({}, g, g.effects ? {
                effects: g.effects.slice()
              } : {}, {
                enhancement: g.enhancement || 0
              });
            }),
            loadouts: this.loadouts.map(function (s) {
              return s.slice();
            }),
            nextGearId: this.nextGearId,
            dropRemainder: this.dropRemainder,
            highestWave: this.highestWave,
            heroes: this.heroes.map(function (h) {
              return _extends({}, h, {
                talents: h.talents.slice()
              });
            }),
            enemies: this.enemies.map(function (e) {
              return _extends({}, e);
            }),
            gold: this.gold,
            kills: this.kills,
            wave: this.wave,
            clearedWaves: this.clearedWaves,
            idleElapsed: this.idleElapsed,
            incomeRemainder: this.incomeRemainder,
            elapsed: this.elapsed,
            actions: this.actions,
            damage: this.damage,
            received: this.received,
            autoSkill: this.autoSkill,
            paused: this.paused,
            waveDelay: this.waveDelay,
            regrouping: this.regrouping,
            result: this.result,
            cursor: this.cursor,
            timer: this.timer,
            monsterIndex: this.monsterIndex,
            count: this.count,
            continuous: this.continuous
          };
        };
        SquadBattleModel.restore = function restore(value) {
          // Reject malformed or future saves as a whole; never partially apply balances.
          try {
            var d = value;
            var num = function num(v, max) {
              if (max === void 0) {
                max = 1e12;
              }
              return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= max;
            };
            var integer = function integer(v, max) {
              if (max === void 0) {
                max = 1e12;
              }
              return num(v, max) && Number.isInteger(v);
            };
            if (!d || d.version !== 1 && d.version !== 2 && d.version !== 3 && d.version !== 4 && d.version !== 5 && d.version !== 6 && d.version !== 7 && d.version !== 8 && d.version !== 9 && d.version !== 10 && d.version !== 11 || !integer(d.monsterIndex, 3) || !integer(d.count, 3) || d.count < 1 || typeof d.continuous !== 'boolean') return null;
            if (!Array.isArray(d.heroes) || d.heroes.length !== (d.version >= 5 ? 4 : 3) || !Array.isArray(d.enemies) || d.enemies.length !== d.count) return null;
            if (!['gold', 'kills', 'wave', 'clearedWaves', 'actions', 'damage', 'received'].every(function (k) {
              return integer(d[k]);
            }) || d.wave < 1) return null;
            if (!['idleElapsed', 'elapsed'].every(function (k) {
              return num(d[k]);
            }) || !num(d.incomeRemainder, 5) || d.incomeRemainder >= 5 || !num(d.timer, 1) || d.timer >= 1 || !num(d.waveDelay, 2)) return null;
            if (typeof d.autoSkill !== 'boolean' || typeof d.paused !== 'boolean' || typeof d.regrouping !== 'boolean' || ['fighting', 'victory', 'defeat'].indexOf(d.result) < 0 || !integer(d.cursor, d.count + 2)) return null;
            var b = new SquadBattleModel(d.monsterIndex, Math.random, d.count, d.continuous);
            if (d.version >= 2) {
              if (!Array.isArray(d.inventory) || !Array.isArray(d.loadouts) || d.loadouts.length !== (d.version >= 5 ? 4 : 3) || !integer(d.nextGearId) || d.nextGearId < 1 || !num(d.dropRemainder, DROP_SECONDS) || d.dropRemainder >= DROP_SECONDS || !integer(d.highestWave) || d.highestWave < d.wave) return null;
              var ids = new Set();
              var _loop3 = function _loop3() {
                  var g = _step6.value;
                  if (!g || !validGearEffects(g) || !integer(g.id) || g.id < 1 || g.id >= d.nextGearId || ids.has(g.id) || !integer(g.slot, 5) || !integer(g.quality, 4) || !integer(g.level, 100) || g.level < 1 || typeof g.locked !== 'boolean' || !['hp', 'attack', 'defense', 'power'].every(function (k) {
                    return integer(g[k], 1000000);
                  })) return {
                    v: null
                  };
                  if (d.version >= 3 && !integer(g.enhancement, ENHANCE_CAP)) return {
                    v: null
                  };
                  ids.add(g.id);
                },
                _ret2;
              for (var _iterator6 = _createForOfIteratorHelperLoose(d.inventory), _step6; !(_step6 = _iterator6()).done;) {
                _ret2 = _loop3();
                if (_ret2) return _ret2.v;
              }
              var used = new Set();
              for (var _iterator7 = _createForOfIteratorHelperLoose(d.loadouts), _step7; !(_step7 = _iterator7()).done;) {
                var slots = _step7.value;
                if (!Array.isArray(slots) || slots.length !== 6) return null;
                var _loop4 = function _loop4() {
                    var id = slots[slot];
                    if (id === null) return 0; // continue
                    var g = d.inventory.find(function (g) {
                      return g.id === id;
                    });
                    if (!g || g.slot !== slot || used.has(id)) return {
                      v: null
                    };
                    used.add(id);
                  },
                  _ret3;
                for (var slot = 0; slot < 6; slot++) {
                  _ret3 = _loop4();
                  if (_ret3 === 0) continue;
                  if (_ret3) return _ret3.v;
                }
              }
              if (d.interfaceProgress === undefined) b.interfaceProgress.capacity = Math.max(200, Math.ceil(d.inventory.length / 50) * 50);
              b.inventory = d.inventory.map(function (g) {
                return _extends({}, g, g.effects ? {
                  effects: g.effects.slice()
                } : {}, {
                  enhancement: d.version >= 3 ? g.enhancement : 0
                });
              });
              b.loadouts = d.loadouts.map(function (s) {
                return s.slice();
              });
              b.nextGearId = d.nextGearId;
              b.dropRemainder = d.dropRemainder;
              b.highestWave = d.highestWave;
            } else b.highestWave = d.wave;
            if (d.version >= 3) {
              if (!integer(d.materials) || !integer(d.autoSalvaged) || !validRules(d.rules)) return null;
              b.materials = d.materials;
              b.autoSalvaged = d.autoSalvaged;
              b.rules = _extends({}, d.rules, {
                attributes: d.rules.attributes.slice()
              });
            }
            if (d.version >= 4) {
              if (!validRecruit(d.recruitment)) return null;
              b.recruitment = JSON.parse(JSON.stringify(d.recruitment));
            }
            if (d.version < 5) b.loadouts[3] = Array(6).fill(null);
            if (d.version >= 5) {
              if (!Array.isArray(d.formation) || d.formation.length < 1 || d.formation.length > 3 || new Set(d.formation).size !== d.formation.length || !d.formation.every(function (i) {
                return b.owns(i);
              }) || d.cursor >= d.formation.length + d.count) return null;
              b.formation = d.formation.slice();
              b.buildOrder();
            }
            if (d.interfaceProgress !== undefined) {
              if (!validV2(d.interfaceProgress)) return null;
              b.interfaceProgress = JSON.parse(JSON.stringify(d.interfaceProgress));
            }
            for (var _i3 = 0; _i3 < d.heroes.length; _i3++) {
              var h = d.heroes[_i3];
              if (!h || !integer(h.level, LEVEL_CAP) || h.level < 1 || !integer(h.experience) || !integer(h.hp) || !integer(h.shield) || !num(h.cooldown, HERO_CONFIG[_i3].cooldown) || typeof h.queued !== 'boolean' || !integer(h.damage) || !integer(h.healing)) return null;
              if (d.version >= 5 && !b.owns(_i3) && (h.level !== 1 || h.experience !== 0 || b.loadouts[_i3].some(function (id) {
                return id !== null;
              }))) return null;
              var stars = d.version >= 6 ? h.stars : 1;
              if (!integer(stars, STAR_CONFIG.cap) || stars < 1 || starSpent(stars) > Math.max(0, b.recruitment.counts[_i3] - 1)) return null;
              if (d.version >= 7 && (!num(h.cooldown2, SECOND_COOLDOWN) || typeof h.queued2 !== 'boolean' || h.level < 5 && (h.cooldown2 > 0 || h.queued2))) return null;
              var talents = d.version >= 8 ? h.talents : [0, 0, 0, 0];
              if (!Array.isArray(talents) || talents.length !== 4 || !talents.every(function (r, j) {
                return integer(r, TALENTS[j].max);
              }) || talents[3] > 0 && talents[2] === 0 || talents.reduce(function (n, r, j) {
                return n + r * TALENTS[j].cost;
              }, 0) + b.interfaceProgress.tree[_i3].reduce(function (n, r) {
                return n + r;
              }, 0) > h.level - 1) return null;
              b.heroes[_i3] = _extends({}, h, {
                stars: stars,
                talents: talents.slice(),
                cooldown2: d.version >= 7 ? h.cooldown2 : 0,
                queued2: d.version >= 7 ? h.queued2 : false
              });
              if (h.hp > b.stats(_i3).hp || h.shield > b.stats(_i3).power) return null;
            }
            if (d.version >= 9) {
              if (!integer(d.lastSeen, 1e15)) return null;
              b.lastSeen = d.lastSeen;
              if (d.offline !== null) {
                var r = d.offline;
                if (!r || !integer(r.seconds, OFFLINE_CONFIG.capSeconds) || r.seconds < 5 || r.seconds % 5 || !integer(r.gold) || !integer(r.checkpoint) || r.checkpoint < 1 || r.checkpoint > b.highestWave || !Array.isArray(r.experience) || r.experience.length !== 4 || !r.experience.every(function (v, i) {
                  return integer(v) && (b.owns(i) || v === 0);
                }) || !Array.isArray(r.equipment) || r.equipment.length !== Math.floor(r.seconds / 30)) return null;
                var _ids = new Set(b.inventory.map(function (g) {
                  return g.id;
                }));
                var _loop5 = function _loop5() {
                    var g = _step8.value;
                    if (!g || !validGearEffects(g) || !integer(g.id) || g.id < 1 || g.id >= b.nextGearId || _ids.has(g.id) || !integer(g.slot, 5) || !integer(g.quality, 4) || !integer(g.level, 100) || g.level < 1 || g.locked !== false || (g.enhancement || 0) !== 0 || !['hp', 'attack', 'defense', 'power'].every(function (k) {
                      return integer(g[k], 1000000);
                    })) return {
                      v: null
                    };
                    _ids.add(g.id);
                  },
                  _ret4;
                for (var _iterator8 = _createForOfIteratorHelperLoose(r.equipment), _step8; !(_step8 = _iterator8()).done;) {
                  _ret4 = _loop5();
                  if (_ret4) return _ret4.v;
                }
                b.offline = JSON.parse(JSON.stringify(r));
              }
            }
            for (var _iterator9 = _createForOfIteratorHelperLoose(d.enemies), _step9; !(_step9 = _iterator9()).done;) {
              var e = _step9.value;
              if (!e || !integer(e.kind, 3) || !integer(e.maxHp, 1000000) || e.maxHp < 1 || !integer(e.hp, e.maxHp) || !integer(e.attack, 100000)) return null;
            }
            if (d.result === 'fighting' && d.waveDelay === 0 && (b.party.every(function (h) {
              return h.hp === 0;
            }) || d.enemies.every(function (e) {
              return e.hp === 0;
            }))) return null;
            if (d.encounter != null) {
              var c = d.encounter;
              if (!integer(c.id, 5) || !integer(c.difficulty, 2) || c.startFloor !== 1 || d.continuous || d.count !== 3 || d.regrouping || c.id !== 5 && d.wave > DUNGEON_CONFIG.mobWaves + 1 || d.clearedWaves > d.wave || d.result === 'victory' && (c.id === 5 || d.clearedWaves !== DUNGEON_CONFIG.mobWaves + 1)) return null;
              b.encounter = _extends({}, c);
            }
            b.enemies = d.enemies.map(function (e) {
              return _extends({}, e);
            });
            for (var _iterator10 = _createForOfIteratorHelperLoose(['gold', 'kills', 'wave', 'clearedWaves', 'idleElapsed', 'incomeRemainder', 'elapsed', 'actions', 'damage', 'received', 'autoSkill', 'paused', 'waveDelay', 'regrouping', 'result', 'cursor', 'timer']), _step10; !(_step10 = _iterator10()).done;) {
              var key = _step10.value;
              b[key] = d[key];
            }
            if (d.version >= 10) {
              if (!validDungeon(d.dungeon)) return null;
              if (d.dungeon.run) {
                var _r = d.dungeon.run,
                  fight = SquadBattleModel.restore(_r.battle);
                if (!fight || fight.encounter && (fight.encounter.id !== _r.id || fight.encounter.difficulty !== _r.difficulty)) return null;
              }
              b.dungeon = JSON.parse(JSON.stringify(d.dungeon));
            }
            return b;
          } catch (_unused2) {
            return null;
          }
        }
        // Real foreground time, intentionally separate from battle speed and kill count.
        ;

        _proto.settleIdle = function settleIdle(seconds) {
          var _this16 = this;
          if (this.paused || !Number.isFinite(seconds) || seconds <= 0) return 0;
          this.dropRemainder += seconds;
          var drops = Math.floor((this.dropRemainder + 1e-8) / DROP_SECONDS);
          if (drops) {
            this.dropRemainder = Math.max(0, this.dropRemainder - drops * DROP_SECONDS);
            for (var n = 0; n < drops; n++) {
              var g = generateGear(this.nextGearId++, Math.min(100, 1 + Math.floor((this.highestWave - 1) / 3)));
              this.inventory.push(g);
              if (this.inventory.length > this.interfaceProgress.capacity || this.rules.enabled && !this.retained(g)) {
                this.salvage([g.id]);
                this.autoSalvaged++;
              }
            }
          }
          this.idleElapsed += seconds;
          this.incomeRemainder += seconds;
          var ticks = Math.floor((this.incomeRemainder + 1e-8) / 5);
          if (ticks) {
            this.incomeRemainder = Math.max(0, this.incomeRemainder - ticks * 5);
            this.gold += ticks * 10;
            this.heroes.forEach(function (h, i) {
              if (_this16.owns(i)) h.experience += ticks * 8;
            });
          }
          return ticks;
        };
        _proto.step = function step(dt) {
          var _this17 = this;
          if (this.paused || this.result !== 'fighting' || !Number.isFinite(dt) || dt <= 0) return [];
          var hits = [];
          var _loop6 = function _loop6() {
              if (_this17.waveDelay > 0) {
                var _delta = Math.min(dt, _this17.waveDelay);
                _this17.waveDelay -= _delta;
                dt -= _delta;
                if (_this17.waveDelay < 1e-8) {
                  _this17.waveDelay = 0;
                  if (_this17.regrouping) {
                    _this17.party.forEach(function (h, i) {
                      h.hp = _this17.battleStats(i).hp;
                      h.shield = 0;
                      h.cooldown = 0;
                      h.queued = false;
                      h.cooldown2 = 0;
                      h.queued2 = false;
                    });
                    _this17.regrouping = false;
                  } else _this17.wave++;
                  _this17.spawn();
                }
                return 0; // continue
              }

              var delta = Math.min(dt, 1 - _this17.timer);
              _this17.timer += delta;
              _this17.elapsed += delta;
              dt -= delta;
              _this17.party.forEach(function (h) {
                h.cooldown2 = Math.max(0, h.cooldown2 - delta);
                if (h.cooldown2 < 1e-8) h.cooldown2 = 0;
                h.cooldown = Math.max(0, h.cooldown - delta);
                if (h.cooldown < 1e-8) h.cooldown = 0;
              });
              if (_this17.timer + 1e-8 < 1) return 1; // break
              _this17.timer = 0;
              var actor = _this17.order[_this17.cursor];
              _this17.cursor = (_this17.cursor + 1) % _this17.order.length;
              while (!_this17.alive(actor)) {
                actor = _this17.order[_this17.cursor];
                _this17.cursor = (_this17.cursor + 1) % _this17.order.length;
              }
              _this17.actions++;
              var target = actor,
                damage = 0,
                blocked = 0,
                heal = 0,
                skill = false,
                killed = false,
                skillSlot = 0;
              if (actor >= 3) {
                target = _this17.target();
                var h = _this17.party[target],
                  attack = Math.max(1, _this17.enemies[actor - 3].attack - _this17.battleStats(target).defense);
                blocked = Math.min(h.shield, attack);
                h.shield -= blocked;
                damage = Math.min(h.hp, attack - blocked);
                h.hp -= damage;
                _this17.received += damage;
              } else {
                var _h = _this17.party[actor],
                  c = _this17.battleStats(actor),
                  patient = _this17.patient(),
                  hero = _this17.formation[actor];
                var second = _this17.unlocked(hero, 2) && _h.cooldown2 <= 0 && (_h.queued2 || !_h.queued && _this17.autoSkill && _h.cooldown > 0) && (hero !== 2 || patient !== undefined);
                if (second) {
                  skill = true;
                  skillSlot = 2;
                  _h.queued2 = false;
                  _h.cooldown2 = _this17.secondCooldown(hero);
                  var power = Math.round(c.power * 1.4);
                  if (hero === 2) {
                    target = patient;
                    heal = Math.min(power, _this17.battleStats(target).hp - _this17.party[target].hp);
                    _this17.party[target].hp += heal;
                    _h.healing += heal;
                  } else {
                    target = _this17.selectEnemy(hero === 0 ? 'highest-attack' : 'lowest-hp-ratio');
                    damage = Math.min(_this17.enemies[target - 3].hp, power);
                  }
                } else if (_h.cooldown <= 0 && (_this17.autoSkill || _h.queued) && (hero !== 2 || patient !== undefined)) {
                  skill = true;
                  _h.queued = false;
                  _h.cooldown = c.cooldown;
                  if (hero === 0) {
                    target = actor;
                    _h.shield = c.power;
                  } else if (hero === 2) {
                    target = patient;
                    heal = Math.min(c.power, _this17.battleStats(target).hp - _this17.party[target].hp);
                    _this17.party[target].hp += heal;
                    _h.healing += heal;
                  } else {
                    target = _this17.selectEnemy(hero === 3 ? 'lowest-hp-ratio' : FIRE_TARGET);
                    damage = Math.min(_this17.enemies[target - 3].hp, c.power);
                  }
                } else {
                  target = _this17.selectEnemy('random');
                  damage = Math.min(_this17.enemies[target - 3].hp, c.attack);
                }
                if (damage) {
                  var e = _this17.enemies[target - 3];
                  e.hp -= damage;
                  _h.damage += damage;
                  _this17.damage += damage;
                  if (e.hp === 0) {
                    killed = true;
                    _this17.kills++;
                  }
                }
              }
              hits.push({
                actor: actor,
                hero: actor < 3 ? _this17.formation[actor] : undefined,
                target: target,
                damage: damage,
                blocked: blocked,
                heal: heal,
                skill: skill,
                skillSlot: skillSlot,
                killed: killed,
                hpAfter: target < 3 ? _this17.party[target].hp : _this17.enemies[target - 3].hp,
                shieldAfter: target < 3 ? _this17.party[target].shield : 0
              });
              if (_this17.enemies.every(function (e) {
                return e.hp <= 0;
              })) {
                _this17.clearedWaves++;
                if (_this17.continuous || _this17.encounter && (_this17.encounter.id === 5 || _this17.wave <= DUNGEON_CONFIG.mobWaves)) {
                  _this17.waveDelay = 1.2;
                  _this17.party.forEach(function (h, i) {
                    if (h.hp > 0) h.hp = Math.min(_this17.battleStats(i).hp, h.hp + Math.ceil(_this17.battleStats(i).hp * .08));
                  });
                } else _this17.result = 'victory';
              } else if (_this17.party.every(function (h) {
                return h.hp <= 0;
              })) {
                if (_this17.continuous) {
                  _this17.waveDelay = 2;
                  _this17.regrouping = true;
                } else _this17.result = 'defeat';
              }
            },
            _ret5;
          while (dt > 1e-9 && this.result === 'fighting') {
            _ret5 = _loop6();
            if (_ret5 === 0) continue;
            if (_ret5 === 1) break;
          }
          return hits;
        };
        _createClass(SquadBattleModel, [{
          key: "party",
          get: function get() {
            var _this18 = this;
            return this.formation.map(function (i) {
              return _this18.heroes[i];
            });
          }
        }, {
          key: "enemy",
          get: function get() {
            return _extends({}, MONSTERS[this.enemies[0].kind], {
              hp: this.enemies[0].maxHp
            });
          }
        }, {
          key: "enemyHp",
          get: function get() {
            return this.enemies[0].hp;
          },
          set: function set(value) {
            this.enemies[0].hp = value;
          }
        }, {
          key: "nextActor",
          get: function get() {
            for (var n = 0; n < this.order.length; n++) {
              var _i4 = this.order[(this.cursor + n) % this.order.length];
              if (this.alive(_i4)) return _i4;
            }
            return 0;
          }
        }]);
        return SquadBattleModel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/V2Progress.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        treeBonuses: treeBonuses,
        validV2: validV2
      });
      cclegacy._RF.push({}, "f13e21C0GNPPoWmGHYGAASf", "V2Progress", undefined);
      /** Second-edition test configuration. Persisted in the existing atomic save. */
      var V2_CONFIG = exports('V2_CONFIG', {
        initialUpTickets: 60,
        initialCapacity: 200,
        capacityStep: 50,
        capacityCost: 500,
        quickSeconds: 1800,
        quickCost: 10,
        gearCap: 100
      });
      var FORMATIONS = exports('FORMATIONS', [{
        name: '守护阵',
        rates: [60, 25, 15]
      }, {
        name: '双锋阵',
        rates: [40, 40, 20]
      }, {
        name: '均衡阵',
        rates: [34, 33, 33]
      }, {
        name: '突击阵',
        rates: [70, 15, 15]
      }]);
      var initialV2 = exports('initialV2', function initialV2() {
        return {
          upTickets: 60,
          capacity: 200,
          presets: [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]],
          preset: 0,
          formation: 0,
          tree: Array.from({
            length: 4
          }, function () {
            return Array(15).fill(0);
          })
        };
      });
      function validV2(p) {
        return !!p && Array.isArray(p.tree) && p.tree.length === 4 && p.tree.every(function (a) {
          return Array.isArray(a) && a.length === 15 && a.every(function (v, i) {
            return [0, 1].indexOf(v) >= 0 && (!v || i % 5 === 0 || a[i - 1] === 1);
          });
        }) && Number.isSafeInteger(p.upTickets) && p.upTickets >= 0 && p.upTickets <= 1e9 && Number.isSafeInteger(p.capacity) && p.capacity >= 50 && p.capacity <= 1e6 && Number.isInteger(p.preset) && p.preset >= 0 && p.preset < 4 && Number.isInteger(p.formation) && p.formation >= 0 && p.formation < 4 && Array.isArray(p.presets) && p.presets.length === 4 && p.presets.every(function (a) {
          return Array.isArray(a) && a.length > 0 && a.length <= 3 && new Set(a).size === a.length && a.every(function (i) {
            return Number.isInteger(i) && i >= 0 && i < 4;
          });
        });
      }

      // Five trunk nodes, five left branches, five right branches; every purchase is independent.
      var TREE_NODES = exports('TREE_NODES', Array.from({
        length: 15
      }, function (_, i) {
        return {
          name: i < 5 ? ['主动强化', '被动专精', '技能增幅', '治疗护盾', '技能流转'][i] : i < 10 ? '坚韧 ' + (i - 4) : '锋芒 ' + (i - 9),
          description: i < 5 ? i === 4 ? '第二主动冷却减少1秒' : '两个主动技能效果 +4%' : i < 10 ? '最大生命 +4%，防御 +2' : '普通攻击伤害 +4%',
          cost: 1,
          parent: i % 5 === 0 ? -1 : i - 1
        };
      }));
      function treeBonuses(p, id) {
        var _p$tree;
        var a = ((_p$tree = p.tree) == null ? void 0 : _p$tree[id]) || [];
        return {
          hp: a.slice(5, 10).reduce(function (n, r) {
            return n + r;
          }, 0) * .04,
          attack: a.slice(10, 15).reduce(function (n, r) {
            return n + r;
          }, 0) * .04,
          power: a.slice(0, 4).reduce(function (n, r) {
            return n + r;
          }, 0) * .04,
          defense: a.slice(5, 10).reduce(function (n, r) {
            return n + r;
          }, 0) * 2,
          cooldown: a[4] || 0
        };
      }
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map