$(document).ready(function () {
    const $userIcon = $('#userIcon');
    const $userPopup = $('#userPopup');

    $userIcon.on('click', function (e) {
        e.stopPropagation();
        $userPopup.toggleClass('active');
    });

    $(window).on('click', function (e) {
        if (!$userIcon.is(e.target) && $userIcon.has(e.target).length === 0 &&
            !$userPopup.is(e.target) && $userPopup.has(e.target).length === 0) {
            $userPopup.removeClass('active');
        }
    });

    const doctors = [
        { name: "Dr. Juan Pérez", specialty: "Cardiologia", description: "Especialista en enfermedades del corazón.", image: "img/doctor1.jpg" },
        { name: "Dra. Maria Rodriguez", specialty: "Obstetricia", description: "Cuidado integral del embarazo y parto.", image: "img/doctor2.jpg" },
        { name: "Dr. Carlos Gomez", specialty: "Medicina General", description: "Atención primaria y preventiva.", image: "img/doctor3.jpg" },
        { name: "Dra. Ana Lopez", specialty: "Pediatria", description: "Salud y bienestar infantil.", image: "img/doctor4.jpg" },
        { name: "Dr. Luis Martinez", specialty: "Ginecología", description: "Salud reproductiva femenina.", image: "img/doctor5.jpg" },
        { name: "Dra. Sofia Torres", specialty: "Laboratorio", description: "Análisis clínicos y diagnósticos.", image: "img/doctor6.jpg" },
        { name: "Dr. Pedro Sanchez", specialty: "Análisis", description: "Interpretación de resultados médicos.", image: "img/doctor7.jpg" },
        { name: "Dra. Elena Diaz", specialty: "Cardiologia", description: "Cardiología intervencionista.", image: "img/doctor8.jpg" },
        { name: "Dr. Miguel Angel", specialty: "Pediatria", description: "Neonatología y cuidados intensivos.", image: "img/doctor9.jpg" }
    ];

    const $doctorsGrid = $('#doctorsGrid');
    const $searchInput = $('#searchInput');

    function renderDoctors(filterText = '') {
        $doctorsGrid.empty();

        const filteredDoctors = doctors.filter(doctor =>
            doctor.specialty.toLowerCase().includes(filterText.toLowerCase()) ||
            doctor.name.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filteredDoctors.length === 0) {
            $doctorsGrid.append('<p>No se encontraron médicos con esa especialidad o nombre.</p>');
            return;
        }

        filteredDoctors.forEach(doctor => {
            const card = `
                <div class="doctor-card">
                    <div class="doctor-image">
                        <img src="${doctor.image}" alt="${doctor.name}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 5px;">
                    </div>
                    <div class="doctor-info">
                        <h3>${doctor.name}</h3>
                        <p><strong>Especialidad:</strong> ${doctor.specialty}</p>
                        <p>${doctor.description}</p>
                        <button class="btn btn-primary" style="margin-top: 10px; background-color: #28a745; text-color: #fff; border-radius: 5px; padding: 5px 10px;">Ver perfil</button>
                    </div>
                </div>
            `;
            $doctorsGrid.append(card);
        });
    }

    renderDoctors();

    $searchInput.on('input', function () {
        renderDoctors($(this).val());
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const menuToogle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelector('.nav-links');

    if (menuToogle && nav) {
        menuToogle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            if (window.innerWidth <= 850) {
                const link = e.target.closest('a');
                const listItem = e.target.closest('li');

                if (link && listItem.querySelector('.submenu')) {
                    e.preventDefault();

                    const submenu = listItem.querySelector('.submenu');

                    document.querySelectorAll('.nav-links > li').forEach(item => {
                        if (item !== listItem && item.classList.contains('submenu-open')) {
                            item.classList.remove('submenu-open');
                            item.querySelector('.submenu').style.maxHeight = 0;
                        }
                    });

                    listItem.classList.toggle('submenu-open');

                    if (listItem.classList.contains('submenu-open')) {
                        submenu.style.maxHeight = submenu.scrollHeight + "px";
                    } else {
                        submenu.style.maxHeight = 0;
                    }
                }
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', (event) => {
    if (window.innerWidth <= 767) {
        const footerHeaders = document.querySelectorAll('.footer-links h4');

        footerHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.closest('.footer-links');
                const content = parent.querySelector('.footer-content');

                if (parent.classList.contains('active')) {
                    content.style.maxHeight = 0;
                    parent.classList.remove('active');
                } else {
                    document.querySelectorAll('.footer-links.active').forEach(item => {
                        item.classList.remove('active');
                        item.querySelector('.footer-content').style.maxHeight = 0;
                    });

                    parent.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }
});
