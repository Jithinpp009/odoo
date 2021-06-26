# -*- coding: utf-8 -*-
{
    'name': "Website Link Dashboard",

    'summary': """ Odoo website link dashboard
         """,

    'description': """
         User friendly website link dashboard
    """,
    'images': [
        'static/description/banner.png',
    ],
    'author': "Jithin",
    'category': 'Tools',
    'version': '0.1',
    'depends': ['base', 'hr'],
    'data': [
        'security/ir.model.access.csv',
        'views/dashboard_views.xml',
    ],

    'qweb': [
            "static/src/xml/website_links_dashboard.xml",
        ],
    'license': 'AGPL-3',
    'installable': True,
    'application': True,
    'auto_install': False,
}