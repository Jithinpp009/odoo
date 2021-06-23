# -*- coding: utf-8 -*-

from odoo import models, fields, api


class WebsiteLinks(models.Model):
    _name = 'website.link'

    name = fields.Char(string='Name')
    link = fields.Char(string='Link')


class AdminDashboard(models.Model):
    _name = 'admin.dashboard'

    @api.model
    def get_general_details_website_link(self):
        emp_data = {'name_arabic': '', 'email': '', 'mobile': '', 'phone': '', 'job': '', 'job_arabic': ''}
        employee = self.env['hr.employee'].sudo().search([('user_id', '=', self.env.user.id)])
        emp_data['name'] = self.env.user.name
        if employee:
            emp_data['email'] = employee.sudo().work_email
            emp_data['mobile'] = employee.mobile_phone
            emp_data['phone'] = employee.sudo().work_phone
            emp_data['job'] = employee.sudo().job_id.name

        links = []
        l_obj = self.env['website.link'].sudo().search([])
        for i in l_obj:
            links.append({
                'name': i.name,
                'link': i.link,
            })

        data = {
            'link': links,
            'emp_data': emp_data,
        }
        return data