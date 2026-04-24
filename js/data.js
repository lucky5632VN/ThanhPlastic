const contentData = {
    phenomena: [
        {
            id: 1,
            title: "Tia sét mini & Quần áo len",
            category: "Điện Trường & Tụ Điện",
            description: "Giải thích hiện tượng nổ lách tách khi cởi áo len mùa đông.",
            icon: "zap",
            color: "#fbff00",
            videoPath: "Video/Video setmini.mp4"
        },
        {
            id: 2,
            title: "Smartphone & Găng tay",
            category: "Điện Trường & Tụ Điện",
            description: "Tại sao màn hình cảm ứng không nhận khi đeo găng tay thường?",
            icon: "smartphone",
            color: "#00f0ff",
            videoPath: "Video/Găng tay.mp4"
        },
        {
            id: 3,
            title: "Tóc dựng đứng khi chải",
            category: "Điện Trường & Tụ Điện",
            description: "Sự truyền điện tích từ lược nhựa sang tóc gây lực đẩy tĩnh điện.",
            icon: "scissors",
            color: "#a855f7",
            videoPath: "Video/Tóc.mp4"
        },
        {
            id: 4,
            title: "Bóng đèn cháy khi vừa bật",
            category: "Dòng Điện Không Đổi",
            description: "Sự thay đổi điện trở theo nhiệt độ của dây tóc bóng đèn.",
            icon: "lightbulb",
            color: "#ef4444",
            videoPath: "Video/Bóng đèn.mp4"
        },
        {
            id: 5,
            title: "Pin điện thoại bị chai?",
            category: "Dòng Điện Không Đổi",
            description: "Bản chất hóa học và sự tích tụ điện tích trong pin Lithium-ion.",
            icon: "battery-warning",
            color: "#22c55e",
            videoPath: "Video/Pin chai.mp4"
        }
    ],
    theory: [
        {
            id: "t4",
            title: "I. ĐỊNH LUẬT OHM",
            content: `
                <div class="theory-section">
                    <h5 class="text-neon-blue">1. Dòng điện – Cường độ dòng điện</h5>
                    <p>Dòng điện là dòng chuyển dời có hướng của các điện tích. Chiều dòng điện được quy ước là chiều dịch chuyển của các điện tích dương.</p>
                    <ul>
                        <li><b>Cường độ dòng điện ($I$):</b> Xác định bằng tỉ số giữa điện lượng $\\Delta q$ và khoảng thời gian $\\Delta t$: $$I = \\frac{\\Delta q}{\\Delta t} \\text{ hay } I = \\frac{q}{t}$$</li>
                        <li><b>Đơn vị:</b> Ampe (A).</li>
                        <li><b>Vận tốc trôi:</b> $I = n \\cdot S \\cdot v \\cdot |q|$ (với $n$ là mật độ hạt tải điện, $S$ là tiết diện, $v$ là vận tốc trôi).</li>
                    </ul>

                    <h5 class="text-neon-blue mt-4">2. Điện trở – Đèn sợi đốt và Điện trở nhiệt</h5>
                    <ul>
                        <li><b>Điện trở dây kim loại:</b> $$R = \\rho \\frac{l}{S}$$ ($\\rho$: điện trở suất ($\\Omega m$), $l$: chiều dài, $S$: tiết diện).</li>
                        <li><b>Định luật Ohm cho đoạn mạch:</b> $$I = \\frac{U}{R} \\implies R = \\frac{U}{I}$$</li>
                        <li><b>Biến thiên theo nhiệt độ:</b> 
                            $$\\rho = \\rho_0 [1 + \\alpha(T - T_0)]$$
                            $$R = R_0 [1 + \\alpha(T - T_0)]$$
                        </li>
                    </ul>

                    <h5 class="text-neon-blue mt-4">3. Suất điện động – Định luật Ohm cho các đoạn mạch</h5>
                    <ul>
                        <li><b>Suất điện động ($\\xi$):</b> Đặc trưng cho khả năng sinh công của nguồn: $$\\xi = \\frac{A}{q}$$</li>
                        <li><b>Định luật Ohm toàn mạch:</b> <br>
                            $$\\boxed{I = \\frac{\\xi}{R + r}} \\implies \\boxed{\\xi = (R + r) \\cdot I}$$
                        </li>
                        <li><b>Hiệu điện thế nguồn:</b>
                            <ul>
                                <li>Nguồn phát: $U = \\xi - I \\cdot r$</li>
                                <li>Nguồn nạp: $U = \\xi + I \\cdot r$</li>
                            </ul>
                        </li>
                        <li><b>Hiện tượng đoản mạch:</b> Xảy ra khi $R \\approx 0$, dòng điện $I = \\xi / r$ cực lớn gây nguy hiểm.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "t5",
            title: "II. NĂNG LƯỢNG VÀ CÔNG SUẤT TIÊU THỤ",
            content: `
                <div class="theory-section">
                    <ul>
                        <li><b>Năng lượng tiêu thụ (W):</b> $$W = A = U \\cdot q = U \\cdot I \\cdot t$$</li>
                        <li><b>Công suất điện ($P$):</b> Đặc trưng cho tốc độ sinh công: $$P = \\frac{A}{t} = U \\cdot I$$</li>
                        <li><b>Định luật Joule – Lenz:</b> Nhiệt lượng tỏa ra tỉ lệ thuận với điện trở, bình phương dòng điện và thời gian: $$Q = R \\cdot I^2 \\cdot t$$</li>
                        <li><b>Công suất tỏa nhiệt:</b> $$P_{nhiệt} = \\frac{Q}{t} = R \\cdot I^2 = \\frac{U^2}{R}$$</li>
                        <li><b>Năng lượng và Công suất nguồn:</b>
                            <ul>
                                <li>Công của nguồn: $A_{ng} = \\xi \\cdot I \\cdot t$</li>
                                <li>Công suất nguồn: $P_{ng} = \\xi \\cdot I$</li>
                            </ul>
                        </li>
                        <li><b>Hiệu suất nguồn điện ($H$):</b> $$H = \\frac{U_N}{\\xi} = \\frac{R_N}{R_N + r}$$</li>
                    </ul>
                </div>
            `
        }
    ],
    games: [
        {
            level: 1,
            title: "Ải 1: Hành lang tĩnh điện",
            desc: "Tính toán khoảng cách để né khu vực rò rỉ điện trường.",
            status: "unlocked",
            targetPath: "playLevel1"
        },
        {
            level: 2,
            title: "Ải 2: Cánh cửa điện dung",
            desc: "Kéo thả và ghép tụ điện để đạt định mức điện dung yêu cầu.",
            status: "locked",
            targetPath: "playLevel2"
        },
        {
            level: 3,
            title: "Ải 3: Sửa chữa màn hình",
            desc: "Điều chỉnh d và ε của tụ điện phẳng.",
            status: "locked",
            targetPath: "playLevel3"
        },
        {
            level: 4,
            title: "Ải 4: Truy tìm kẻ phá hoại",
            desc: "Dùng vôn kế, ampe kế tìm điện trở hỏng.",
            status: "locked",
            targetPath: "playLevel4"
        },
        {
            level: 5,
            title: "Ải 5: Nhiệt lượng tỏa ra",
            desc: "Cắt dây sưởi có điện trở phù hợp định luật Joule-Lenz.",
            status: "locked",
            targetPath: "playLevel5"
        }
    ]
};
