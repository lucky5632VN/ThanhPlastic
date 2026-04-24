// js/vlab.js - Logic for Virtual Lab Experiments
window.initVLab = function() {
    // 1. Menu switching logic
    const menuItems = document.querySelectorAll('.vlab-menu li');
    const labPages = document.querySelectorAll('.vlab-lab-page');

    // Power States (Lab 1 only now)
    let powerLab1 = false;

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const labId = item.getAttribute('data-lab');

            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Show/hide lab pages
            labPages.forEach(page => {
                const pageId = page.id; // "vlab-sim-1", "vlab-sim-2", "vlab-sim-3"
                if (pageId === `vlab-sim-${labId}`) {
                    // Determine display type from class
                    if (page.classList.contains('ohm-full-layout') || page.classList.contains('cap2d-full-layout')) {
                        page.style.display = 'grid';
                    } else {
                        page.style.display = 'grid'; // vlab1-layout is also grid
                    }
                    setTimeout(() => page.classList.add('active'), 50);
                } else {
                    page.style.display = 'none';
                    page.classList.remove('active');
                }
            });

            // Initialize logic per lab
            if (labId === '1') updateLab1();
            if (labId === '2') {
                if (typeof updateOhmDisplay === 'function') updateOhmDisplay();
            }
            if (labId === '4') {
                if (typeof updateJouleDisplay === 'function') updateJouleDisplay();
            }
        });
    });

    // -----------------------------------------------------------------
    // LAB 1: Tụ điện phẳng cơ bản
    // -----------------------------------------------------------------
    const btnPower1 = document.getElementById('btn-power-1');
    const l1Eps = document.getElementById('vlab-c-eps');
    const l1S = document.getElementById('vlab-c-s');
    const l1D = document.getElementById('vlab-c-d');
    const l1U = document.getElementById('vlab-c-u');

    if (btnPower1) {
        btnPower1.addEventListener('click', () => {
            powerLab1 = !powerLab1;
            btnPower1.classList.toggle('btn-primary');
            btnPower1.classList.toggle('btn-secondary');
            btnPower1.innerHTML = powerLab1 ? '<i data-lucide="zap"></i> NGẮT NGUỒN' : '<i data-lucide="power"></i> BẬT NGUỒN';
            if (window.lucide) lucide.createIcons();
            updateLab1();
        });
    }

    function updateLab1() {
        const eps = parseFloat(l1Eps.value);
        const S = parseFloat(l1S.value) * 1e-4; // cm2 -> m2
        const d = parseFloat(l1D.value) * 1e-3; // mm -> m
        const U = powerLab1 ? parseFloat(l1U.value) : 0;

        // Update labels
        document.getElementById('vlab-c-s-val').textContent = l1S.value;
        document.getElementById('vlab-c-d-val').textContent = l1D.value;
        document.getElementById('vlab-c-u-val').textContent = l1U.value;
        document.getElementById('vlab-c-d-label').textContent = l1D.value;
        document.getElementById('vlab-c-u-label').textContent = U;

        // Constants
        const eps0 = 8.854e-12;
        const C = (eps * eps0 * S) / d;
        const Q = C * U;
        const E = d > 0 ? U / d : 0;

        // Display results
        document.getElementById('vlab-c-res-c').textContent = (C * 1e12).toFixed(2);
        document.getElementById('vlab-c-res-q').textContent = (Q * 1e6).toFixed(4);
        document.getElementById('vlab-c-res-e').textContent = E.toFixed(0);

        // Update Graphics
        const plateTop = document.getElementById('vlab-c-plate-top');
        const plateBot = document.getElementById('vlab-c-plate-bottom');
        const dielectric = document.getElementById('vlab-c-dielectric');
        const efield = document.getElementById('vlab-c-efield');

        if (plateTop && plateBot && dielectric) {
            const gap = parseFloat(l1D.value) * 10; // scale for visual
            dielectric.style.height = gap + 'px';
            
            // Visual feedback for dielectric type
            const colors = { "1": "transparent", "1.0006": "rgba(255,255,255,0.05)", "3.7": "rgba(244,164,96,0.3)", "7": "rgba(173,216,230,0.3)", "80": "rgba(0,191,255,0.2)" };
            dielectric.style.background = colors[l1Eps.value] || "transparent";

            // Electric field lines
            if (efield) {
                efield.style.opacity = powerLab1 ? Math.min(1, E / 50000) : 0;
                let linesHtml = '';
                const numLines = Math.min(15, Math.floor(E / 2000) + 1);
                for (let i = 0; i < numLines; i++) {
                    linesHtml += '<div class="efield-line"></div>';
                }
                efield.innerHTML = linesHtml;
            }
        }
    }

    [l1Eps, l1S, l1D, l1U].forEach(el => {
        if (el) el.addEventListener('input', updateLab1);
    });

    // -----------------------------------------------------------------
    // LAB 2: Định Luật Ohm & Mạch Điện Tương Tác
    // -----------------------------------------------------------------
    const ohmESlider = document.getElementById('ohm-E-slider');
    const ohmrSlider = document.getElementById('ohm-r-slider');
    const ohmRSlider = document.getElementById('ohm-R-slider');
    const ohmSwitchBtn = document.getElementById('ohm-switch-btn');
    const ohmLogBtn = document.getElementById('ohm-log-btn');
    const ohmClearGraph = document.getElementById('ohm-clear-graph');
    const ohmGraphCanvas = document.getElementById('ohm-graph-canvas');

    let ohmPowerOn = false;
    let ohmDataPoints = [];
    let ohmRowCount = 0;

    function updateOhmDisplay() {
        const E = parseFloat(ohmESlider.value);
        const r = parseFloat(ohmrSlider.value);
        const R = parseFloat(ohmRSlider.value);
        
        document.getElementById('ohm-E-val').textContent = E.toFixed(1);
        document.getElementById('ohm-r-val').textContent = r.toFixed(1);
        document.getElementById('ohm-R-display').textContent = R.toFixed(1);
        
        let I = 0, U = 0;
        if (ohmPowerOn) {
            // Định luật Ohm cho toàn mạch: I = E / (R + r)
            I = E / (R + r);
            U = I * R;
        }

        document.getElementById('ohm-ammeter').textContent = I.toFixed(3);
        document.getElementById('ohm-voltmeter').textContent = U.toFixed(3);
        document.getElementById('ohm-pin-label').innerHTML = `&xi;=${E}V, r=${r}&Omega;`;

        // Update circuit animation
        const particles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => document.getElementById(`ohm-particle-${i}`));
        const blade = document.getElementById('ohm-switch-blade');
        const wires = ['top', 'right', 'bottom'].map(id => document.getElementById(`ohm-wire-${id}`));
        const bulbGlow = document.getElementById('ohm-bulb-glow');

        if (ohmPowerOn) {
            if (blade) blade.style.transform = 'rotate(0deg)';
            
            // Calculate speed based on current I
            const speedFactor = Math.max(0.2, 3 / (I + 0.2)); 
            
            particles.forEach(p => { 
                if(p) {
                    p.style.opacity = '1';
                    const anim = p.querySelector('animateMotion');
                    if (anim) anim.setAttribute('dur', `${speedFactor}s`);
                }
            });
            wires.forEach(w => { if(w) { w.style.stroke = '#00d4ff'; w.style.filter = 'none'; } });
            
            // Bulb brightness based on current (I)
            if (bulbGlow) {
                const brightness = Math.min(1, I / 1.5); // Normalizing for 1.5A max brightness
                bulbGlow.style.opacity = brightness;
                bulbGlow.style.filter = `blur(${4 + brightness * 8}px)`;
            }
        } else {
            if (blade) blade.style.transform = 'rotate(-30deg)';
            particles.forEach(p => { if(p) p.style.opacity = '0'; });
            wires.forEach(w => { if(w) { w.style.stroke = '#1a2e4d'; w.style.filter = 'none'; } });
            if (bulbGlow) bulbGlow.style.opacity = 0;
        }
    }

    function drawOhmGraph() {
        if (!ohmGraphCanvas) return;
        const ctx = ohmGraphCanvas.getContext('2d');
        const w = ohmGraphCanvas.width;
        const h = ohmGraphCanvas.height;
        ctx.clearRect(0, 0, w, h);

        const padLeft = 40;
        const padBot = 30;
        const chartW = w - padLeft - 10;
        const chartH = h - padBot - 10;

        // Draw axes
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(padLeft, 10); 
        ctx.lineTo(padLeft, h - padBot); 
        ctx.lineTo(w - 5, h - padBot);
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 10px Arial';
        ctx.fillText('U (V)', 5, 12);
        ctx.fillText('I (A)', w - 25, h - 10);

        if (ohmDataPoints.length > 0) {
            // Find max values for scaling
            let maxI = Math.max(...ohmDataPoints.map(p => p.I), 1);
            let maxU = Math.max(...ohmDataPoints.map(p => p.U), 1);
            
            // Round up to nice intervals
            maxI = Math.ceil(maxI * 1.2);
            maxU = Math.ceil(maxU * 1.2);

            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 2;
            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            
            const sortedPoints = [...ohmDataPoints].sort((a, b) => a.I - b.I);
            
            sortedPoints.forEach((p, i) => {
                const x = padLeft + (p.I / maxI) * chartW;
                const y = (h - padBot) - (p.U / maxU) * chartH;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Draw points
            sortedPoints.forEach(p => {
                const x = padLeft + (p.I / maxI) * chartW;
                const y = (h - padBot) - (p.U / maxU) * chartH;
                ctx.fillStyle = '#00f0ff';
                ctx.beginPath(); 
                ctx.arc(x, y, 4, 0, Math.PI * 2); 
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.stroke();
            });
        }
    }

    if (ohmRSlider) ohmRSlider.addEventListener('input', updateOhmDisplay);
    if (ohmESlider) ohmESlider.addEventListener('input', updateOhmDisplay);
    if (ohmrSlider) ohmrSlider.addEventListener('input', updateOhmDisplay);

    if (ohmSwitchBtn) {
        ohmSwitchBtn.addEventListener('click', () => {
            ohmPowerOn = !ohmPowerOn;
            ohmSwitchBtn.className = ohmPowerOn ? 'ohm-switch-on' : 'ohm-switch-off';
            ohmSwitchBtn.innerHTML = ohmPowerOn ? '<i data-lucide="power"></i> ĐANG CHẠY...' : '<i data-lucide="power"></i> NGẮT CÔNG TẮC (K)';
            if (window.lucide) lucide.createIcons();
            updateOhmDisplay();
        });
    }

    // Old pin buttons logic removed as we use sliders now

    if (ohmLogBtn) {
        ohmLogBtn.addEventListener('click', () => {
            if (!ohmPowerOn) return;
            const E = parseFloat(ohmESlider.value);
            const r = parseFloat(ohmrSlider.value);
            const R = parseFloat(ohmRSlider.value);
            const I = E / (R + r);
            const U = I * R;
            
            ohmRowCount++;
            ohmDataPoints.push({ I, U });
            ohmDataPoints.sort((a, b) => a.I - b.I);

            const tbody = document.getElementById('ohm-table-body');
            const row = document.createElement('tr');
            row.innerHTML = `<td>${ohmRowCount}</td><td>${R.toFixed(1)}</td><td>${I.toFixed(3)}</td><td>${U.toFixed(3)}</td>`;
            tbody.appendChild(row);
            
            drawOhmGraph();
            
            ohmLogBtn.textContent = 'Đã ghi!';
            ohmLogBtn.style.background = 'var(--success)';
            setTimeout(() => {
                ohmLogBtn.style.background = '';
                ohmLogBtn.textContent = 'Ghi vào bảng dữ liệu (Bảng 26.1)';
            }, 1000);
        });
    }

    if (ohmClearGraph) {
        ohmClearGraph.addEventListener('click', () => {
            ohmDataPoints = [];
            ohmRowCount = 0;
            document.getElementById('ohm-table-body').innerHTML = '';
            drawOhmGraph();
        });
    }

    // -----------------------------------------------------------------
    // LAB 3: Tụ Điện Phẳng 2D Nâng Cao
    // -----------------------------------------------------------------
    const eps0 = 8.854e-12;

    let cap2dState = {
        eps: 1,
        A: 200,      // mm²
        d: 5,        // mm
        V: 2,        // Volts
        isolated: false,
        fixedQ: 0,
        expAnimTimer: null
    };

    let cap2dMaxC = 1, cap2dMaxQ = 1, cap2dMaxW = 1;

    const cap2dCanvas = document.getElementById('cap2d-canvas');
    const cap2dChartCanvas = document.getElementById('cap2d-chart');
    let cap2dCtx = cap2dCanvas ? cap2dCanvas.getContext('2d') : null;
    let cap2dChartCtx = cap2dChartCanvas ? cap2dChartCanvas.getContext('2d') : null;

    function calcCap2D() {
        const eps = cap2dState.eps;
        const A_m2 = cap2dState.A * 1e-6;
        const d_m = cap2dState.d * 1e-3;
        const C = (eps * eps0 * A_m2) / d_m;
        let V_eff = cap2dState.V;

        if (cap2dState.isolated) {
            V_eff = cap2dState.fixedQ / C;
        }

        const Q = C * V_eff;
        const E_field = Math.abs(V_eff) / d_m;
        const W = 0.5 * C * V_eff * V_eff;

        return { C, Q, E_field, W, V_eff };
    }

    function formatCap2DVal(val, baseUnit) {
        const prefixes = [
            { mult: 1e12, sym: 'p' },
            { mult: 1e9,  sym: 'n' },
            { mult: 1e6,  sym: 'μ' },
            { mult: 1e3,  sym: 'm' },
            { mult: 1,    sym: ''}
        ];
        for (const p of prefixes) {
            const scaled = val * p.mult;
            if (scaled >= 0.01 && scaled < 1000) {
                return { val: scaled.toFixed(3), unit: p.sym + baseUnit };
            }
        }
        return { val: (val * 1e12).toFixed(3), unit: 'p' + baseUnit };
    }

    function updateCap2DResults() {
        const { C, Q, E_field, W, V_eff } = calcCap2D();

        const fC = formatCap2DVal(C, 'F');
        const fQ = formatCap2DVal(Math.abs(Q), 'C');
        const fW = formatCap2DVal(W, 'J');

        const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
        setEl('cap2d-res-C', fC.val);
        setEl('cap2d-unit-C', fC.unit);
        setEl('cap2d-res-Q', fQ.val);
        setEl('cap2d-unit-Q', fQ.unit);
        setEl('cap2d-res-E', (E_field >= 1000 ? (E_field/1000).toFixed(1)+' kV/m' : E_field.toFixed(1)+' V/m').split(' ')[0]);
        setEl('cap2d-res-W', fW.val);
        setEl('cap2d-unit-W', fW.unit);

        cap2dMaxC = Math.max(cap2dMaxC, C * 1.1);
        cap2dMaxQ = Math.max(cap2dMaxQ, Math.abs(Q) * 1.1);
        cap2dMaxW = Math.max(cap2dMaxW, W * 1.1);

        drawCap2DCanvas(C, Q, E_field, W, V_eff);
        drawCap2DBarChart(C, Math.abs(Q), W);
        if (typeof updateVoltmeter === 'function') updateVoltmeter();
    }

    function drawCap2DCanvas(C, Q, E_field, W, V_eff) {
        if (!cap2dCtx) return;
        const cw = cap2dCanvas.width, ch = cap2dCanvas.height;
        cap2dCtx.clearRect(0, 0, cw, ch);
        cap2dCtx.fillStyle = '#07090e';
        cap2dCtx.fillRect(0, 0, cw, ch);

        const plateW = 100 + ((cap2dState.A - 100) / 400) * 180;
        const plateH = 12;
        const cx = cw / 2;
        const gapPx = 24 + ((cap2dState.d - 2) / 8) * 96;
        const topPlateY = ch / 2 - gapPx / 2 - plateH;
        const botPlateY = ch / 2 + gapPx / 2;

        const isPositive = V_eff >= 0;
        const topColor = isPositive ? '#ef4444' : '#3b82f6';
        const botColor = isPositive ? '#3b82f6' : '#ef4444';

        const dielColors = { 1: 'rgba(0,240,255,0.03)', 3.7: 'rgba(244,164,96,0.18)', 5: 'rgba(173,216,230,0.2)', 6: 'rgba(200,180,255,0.2)' };
        cap2dCtx.fillStyle = dielColors[cap2dState.eps.toString()] || 'rgba(0,240,255,0.05)';
        cap2dCtx.fillRect(cx - plateW/2, topPlateY + plateH, plateW, gapPx);

        if (Math.abs(V_eff) > 0.01) {
            const numArrows = Math.min(12, Math.max(2, Math.floor(Math.abs(E_field) / 100)));
            const arrowSpacing = plateW / (numArrows + 1);
            for (let i = 1; i <= numArrows; i++) {
                const ax = cx - plateW/2 + i * arrowSpacing;
                const arrowTop = topPlateY + plateH + 4;
                const arrowBot = botPlateY - 4;
                const dirDown = V_eff > 0;
                cap2dCtx.strokeStyle = 'rgba(250,204,21,0.7)';
                cap2dCtx.lineWidth = 1.5;
                cap2dCtx.beginPath(); cap2dCtx.moveTo(ax, arrowTop); cap2dCtx.lineTo(ax, arrowBot); cap2dCtx.stroke();
                cap2dCtx.fillStyle = 'rgba(250,204,21,0.9)';
                const hY = dirDown ? arrowBot : arrowTop;
                const hDir = dirDown ? 1 : -1;
                cap2dCtx.beginPath(); cap2dCtx.moveTo(ax, hY); cap2dCtx.lineTo(ax - 4, hY - hDir * 8); cap2dCtx.lineTo(ax + 4, hY - hDir * 8); cap2dCtx.closePath(); cap2dCtx.fill();
            }
        }

        const drawPlate = (y, color, label) => {
            const grad = cap2dCtx.createLinearGradient(cx - plateW/2, y, cx - plateW/2, y + plateH);
            grad.addColorStop(0, color); grad.addColorStop(1, color + '99');
            cap2dCtx.fillStyle = grad;
            cap2dCtx.beginPath(); cap2dCtx.roundRect(cx - plateW/2, y, plateW, plateH, 3); cap2dCtx.fill();
            cap2dCtx.strokeStyle = color; cap2dCtx.stroke();
            const numCharges = Math.min(18, Math.max(1, Math.round(Math.abs(Q) * 1e12 / 0.3)));
            const chargeSpacing = plateW / (numCharges + 1);
            cap2dCtx.fillStyle = '#ffffff'; cap2dCtx.font = 'bold 10px sans-serif'; cap2dCtx.textAlign = 'center';
            for (let i = 1; i <= numCharges; i++) { cap2dCtx.fillText(label, cx - plateW/2 + i * chargeSpacing, y + plateH/2 + 4); }
        };

        drawPlate(topPlateY, topColor, isPositive ? '+' : '−');
        drawPlate(botPlateY, botColor, isPositive ? '−' : '+');
    }

    function drawCap2DBarChart(C, Q, W) {
        if (!cap2dChartCtx) return;
        const cw = cap2dChartCanvas.width, ch = cap2dChartCanvas.height;
        cap2dChartCtx.clearRect(0, 0, cw, ch);
        cap2dChartCtx.fillStyle = '#070a10';
        cap2dChartCtx.fillRect(0, 0, cw, ch);
        const pad = { l: 10, r: 10, t: 20, b: 30 };
        const plotH = ch - pad.t - pad.b;
        const bars = [
            { label: 'C', val: C, max: cap2dMaxC, color: '#00f0ff' },
            { label: 'Q', val: Q, max: cap2dMaxQ, color: '#facc15' },
            { label: 'W', val: W, max: cap2dMaxW, color: '#22c55e' }
        ];
        bars.forEach((bar, i) => {
            const ratio = bar.max > 0 ? Math.min(1, bar.val / bar.max) : 0;
            const barH = Math.max(2, ratio * plotH);
            const x = pad.l + i * (cw/3) + (cw/6) - 10;
            const y = pad.t + plotH - barH;
            cap2dChartCtx.fillStyle = bar.color;
            cap2dChartCtx.fillRect(x, y, 20, barH);
            cap2dChartCtx.fillStyle = '#94a3b8';
            cap2dChartCtx.font = '10px Outfit';
            cap2dChartCtx.fillText(bar.label, x + 5, ch - 8);
        });
    }

    const cap2dDiscBtn = document.getElementById('cap2d-disconnect-btn');
    if (cap2dDiscBtn) {
        cap2dDiscBtn.addEventListener('click', () => {
            cap2dState.isolated = !cap2dState.isolated;
            if (cap2dState.isolated) {
                const { Q } = calcCap2D();
                cap2dState.fixedQ = Q;
                cap2dDiscBtn.className = 'cap2d-disc-btn disconnected';
                cap2dDiscBtn.innerHTML = '<i data-lucide="plug-zap"></i> Tụ Cô Lập (Q cố định)';
            } else {
                cap2dDiscBtn.className = 'cap2d-disc-btn';
                cap2dDiscBtn.innerHTML = '<i data-lucide="plug"></i> Tụ Được Kết Nối';
            }
            if (window.lucide) lucide.createIcons();
            updateCap2DResults();
        });
    }

    const sliderMap = {
        'cap2d-eps': v => { cap2dState.eps = parseFloat(v); },
        'cap2d-A':   v => { cap2dState.A = parseFloat(v); document.getElementById('cap2d-A-val').textContent = v; },
        'cap2d-d':   v => { cap2dState.d = parseFloat(v); document.getElementById('cap2d-d-val').textContent = v; },
        'cap2d-V':   v => { cap2dState.V = parseFloat(v); document.getElementById('cap2d-V-val').textContent = parseFloat(v).toFixed(1); }
    };
    Object.entries(sliderMap).forEach(([id, fn]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => { fn(el.value); updateCap2DResults(); });
    });

    // --- Interactive Tools (Voltmeter & Ruler) ---
    function makeDraggable(el, onDrag) {
        let isDown = false, startX, startY, elX, elY;
        el.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.clientX; startY = e.clientY;
            elX = el.offsetLeft; elY = el.offsetTop;
            document.body.style.userSelect = 'none';
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            el.style.left = (elX + (e.clientX - startX)) + 'px';
            el.style.top = (elY + (e.clientY - startY)) + 'px';
            if (onDrag) onDrag();
        });
        document.addEventListener('mouseup', () => {
            isDown = false;
            document.body.style.userSelect = '';
        });
    }

    const probeRed = document.getElementById('probe-red');
    const probeBlack = document.getElementById('probe-black');
    const voltVal = document.getElementById('voltmeter-val');
    
    window.updateVoltmeter = function() {
        if (!probeRed || !probeBlack || !voltVal) return;
        const { V_eff } = calcCap2D();
        const dY_px = probeBlack.offsetTop - probeRed.offsetTop;
        const gapPx = 24 + ((cap2dState.d - 2) / 8) * 96;
        
        let readV = (dY_px / gapPx) * V_eff;
        if (Math.abs(readV) > Math.abs(V_eff)) readV = Math.sign(readV) * Math.abs(V_eff);
        
        voltVal.textContent = readV.toFixed(2);
    };

    if (probeRed) makeDraggable(probeRed, window.updateVoltmeter);
    if (probeBlack) makeDraggable(probeBlack, window.updateVoltmeter);

    const rulerTool = document.getElementById('ruler-tool');
    if (rulerTool) makeDraggable(rulerTool);

    // --- Experiments ---
    const exp1Btn = document.getElementById('cap2d-exp1');
    if (exp1Btn) {
        exp1Btn.addEventListener('click', () => {
            cap2dState.d = 10; document.getElementById('cap2d-d').value = 10;
            if(!cap2dState.isolated && document.getElementById('cap2d-V').value == "0") {
                cap2dState.V = 2; document.getElementById('cap2d-V').value = 2;
            }
            updateCap2DResults();
            let step = 0;
            const timer = setInterval(() => {
                step++; cap2dState.d -= 0.1; document.getElementById('cap2d-d').value = cap2dState.d;
                updateCap2DResults();
                if (cap2dState.d <= 2) clearInterval(timer);
            }, 30);
        });
    }

    const exp2Btn = document.getElementById('cap2d-exp2');
    if (exp2Btn) {
        exp2Btn.addEventListener('click', () => {
            document.getElementById('cap2d-eps').value = "1"; cap2dState.eps = 1;
            cap2dState.isolated = false;
            cap2dState.V = 3; document.getElementById('cap2d-V').value = 3;
            updateCap2DResults(); 
            
            setTimeout(() => {
                cap2dState.isolated = true;
                cap2dState.fixedQ = calcCap2D().Q;
                if(cap2dDiscBtn) {
                    cap2dDiscBtn.className = 'cap2d-disc-btn disconnected';
                    cap2dDiscBtn.innerHTML = '<i data-lucide="plug-zap"></i> Tụ Cô Lập (Q cố định)';
                    if (window.lucide) lucide.createIcons();
                }
                
                const targetEps = 6;
                const epsEl = document.getElementById('cap2d-eps');
                const timer = setInterval(() => {
                    cap2dState.eps += 0.1;
                    if (cap2dState.eps >= targetEps) {
                        cap2dState.eps = targetEps;
                        epsEl.value = "6";
                        clearInterval(timer);
                    }
                    updateCap2DResults();
                }, 50);
            }, 1000);
        });
    }

    if (typeof updateOhmDisplay === 'function') updateOhmDisplay();

    // -----------------------------------------------------------------
    // LAB 4: ĐỊNH LUẬT JOULE-LENZ
    // -----------------------------------------------------------------
    let jouleState = {
        U: 12.0, R: 10.0, t: 0, T1: 25.0, T2: 25.0,
        running: false, m: 0.2, c: 4180, timer: null, rowCount: 0
    };

    const jUSlider = document.getElementById('joule-u-slider');
    const jRSlider = document.getElementById('joule-r-slider');
    const jT1Slider = document.getElementById('joule-t1-slider');
    const jTimerDisplay = document.getElementById('joule-timer-display');
    const jStartBtn = document.getElementById('joule-timer-start');
    const jResetBtn = document.getElementById('joule-timer-reset');
    const jLogBtn = document.getElementById('joule-log-btn');
    const jTableBody = document.getElementById('joule-table-body');
    const jTempDisplay = document.getElementById('temp-display');
    const jMercury = document.getElementById('therm-mercury');
    const jStirrer = document.getElementById('stirrer');
    const jHeatingCoil = document.getElementById('heating-coil');
    const jBubblesGroup = document.getElementById('bubbles-group');

    function updateJouleDisplay() {
        jouleState.U = parseFloat(jUSlider.value);
        jouleState.R = parseFloat(jRSlider.value);
        
        // Update T1 if not running
        if (!jouleState.running && jT1Slider) {
            jouleState.T1 = parseFloat(jT1Slider.value);
            if (jouleState.t === 0) jouleState.T2 = jouleState.T1;
        }

        const I = jouleState.U / jouleState.R;
        const P = jouleState.U * I;

        document.getElementById('joule-u-led').textContent = `${jouleState.U.toFixed(1)} V`;
        document.getElementById('joule-r-led').textContent = `${jouleState.R.toFixed(1)} \u03a9`;
        document.getElementById('joule-t1-led').textContent = `${jouleState.T1.toFixed(1)} \u00b0C`;
        document.getElementById('psu-voltage').textContent = `${jouleState.U.toFixed(1)}V`;
        
        const A = jouleState.U * I * jouleState.t;
        const Q = jouleState.m * jouleState.c * (jouleState.T2 - jouleState.T1);

        document.getElementById('joule-q-thu').textContent = Q.toFixed(1);
        document.getElementById('joule-a-dien').textContent = A.toFixed(1);

        // Visuals
        if (jouleState.running) {
            jStirrer.classList.add('stirring');
            const coilColor = `rgb(${Math.min(255, 100 + P * 2)}, 50, 50)`;
            jHeatingCoil.style.stroke = coilColor;
            jHeatingCoil.style.filter = `drop-shadow(0 0 5px ${coilColor})`;
            
            // Bubbles based on power
            if (P > 5 && Math.random() > 0.8) createBubble();
        } else {
            jStirrer.classList.remove('stirring');
            jHeatingCoil.style.stroke = '#94a3b8';
            jHeatingCoil.style.filter = 'none';
        }

        jTempDisplay.textContent = `${jouleState.T2.toFixed(1)}\u00b0C`;
        const mercHeight = 60 + (jouleState.T2 - 25) * 2;
        jMercury.setAttribute('height', Math.min(130, mercHeight));
        jMercury.setAttribute('y', 290 - Math.min(130, mercHeight));
    }

    function createBubble() {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const x = 210 + Math.random() * 80;
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", 280);
        circle.setAttribute("r", 1 + Math.random() * 3);
        circle.setAttribute("fill", "rgba(255,255,255,0.4)");
        circle.classList.add("bubble");
        jBubblesGroup.appendChild(circle);
        setTimeout(() => circle.remove(), 2000);
    }

    function tick() {
        if (!jouleState.running) return;
        jouleState.t += 0.1;
        const I = jouleState.U / jouleState.R;
        const P = jouleState.U * I;
        const dT = (P * 0.1) / (jouleState.m * jouleState.c);
        jouleState.T2 += dT;

        // Update timer string
        const mins = Math.floor(jouleState.t / 60);
        const secs = (jouleState.t % 60).toFixed(1);
        jTimerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.padStart(4, '0')}`;
        
        updateJouleDisplay();
    }

    if (jStartBtn) {
        jStartBtn.addEventListener('click', () => {
            jouleState.running = !jouleState.running;
            jStartBtn.textContent = jouleState.running ? 'STOP' : 'START';
            jStartBtn.style.background = jouleState.running ? 'var(--danger)' : 'var(--success)';
            if (jouleState.running) {
                jouleState.timer = setInterval(tick, 100);
            } else {
                clearInterval(jouleState.timer);
            }
        });
    }

    if (jResetBtn) {
        jResetBtn.addEventListener('click', () => {
            jouleState.running = false;
            clearInterval(jouleState.timer);
            jouleState.t = 0;
            jouleState.T2 = jouleState.T1;
            jStartBtn.textContent = 'START';
            jStartBtn.style.background = 'var(--success)';
            jTimerDisplay.textContent = '00:00.0';
            updateJouleDisplay();
        });
    }

    if (jUSlider) jUSlider.addEventListener('input', updateJouleDisplay);
    if (jRSlider) jRSlider.addEventListener('input', updateJouleDisplay);
    if (jT1Slider) jT1Slider.addEventListener('input', updateJouleDisplay);

    if (jLogBtn) {
        jLogBtn.addEventListener('click', () => {
            jouleState.rowCount++;
            const I = jouleState.U / jouleState.R;
            const deltaT = jouleState.T2 - jouleState.T1;
            const Adien = jouleState.U * I * jouleState.t;
            const Qthu = jouleState.m * jouleState.c * deltaT;
            
            const row = `<tr>
                <td>${jouleState.rowCount}</td>
                <td>${I.toFixed(2)}</td>
                <td>${jouleState.U.toFixed(1)}</td>
                <td>${jouleState.t.toFixed(1)}</td>
                <td>${deltaT.toFixed(1)}</td>
                <td class="text-neon-yellow">${Qthu.toFixed(1)}</td>
                <td class="text-neon-blue">${Adien.toFixed(1)}</td>
            </tr>`;
            jTableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    updateJouleDisplay();
};
