import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {

    private companies = [
        {
            id: 1, name: 'CompanyA', subscribedChannels: ['ui'], users: [
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
            ]
        },
        {
            id: 2, name: 'CompanyB', subscribedChannels: ['email', 'ui'],
            users: [
                { id: 3, name: 'Jack' },
                { id: 4, name: 'Max' },
            ]
        },
    ];

    getUserById(company, userId: number) {
        return company.users.find(user => user.id == userId);
    }

    getCompanyById(companyId: number) {
        return this.companies.find(company => company.id == companyId);
    }

    getUserCompanySubscriptions(companyId: number, userId: number) {
        const company = this.getCompanyById(companyId);
        if (!company) throw new Error('Company not found');

        const user = this.getUserById(company, userId);
        if (!user) throw new Error('User not found');

        company['user'] = user;

        return company;
    }
}
